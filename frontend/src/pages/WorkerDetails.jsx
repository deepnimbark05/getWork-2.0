import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const WorkerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rangeValue, setRangeValue] = useState(7);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingComment, setRatingComment] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'rating'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const response = await axios.get(`http://localhost:3001/api/workers/${id}/reviews`);
      // Filter out disabled reviews
      const enabledReviews = response.data.filter(review => !review.isDisabled);
      setReviewList(enabledReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      // If worker is passed via location.state, use that
      if (location.state?.worker) {
        setWorker(location.state.worker);
        setTotalAmount(location.state.worker.perDayCharge * 7);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`http://localhost:3001/api/workers/${id}`);
          setWorker(response.data);
          setTotalAmount(response.data.perDayCharge * 7);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching worker details:', error);
          setLoading(false);
        }
      }
    };

    fetchWorkerDetails();
    fetchReviews();
  }, [id, location.state]);

  const handleRangeChange = (e) => {
    const days = parseInt(e.target.value);
    setRangeValue(days);
    if (worker) {
      setTotalAmount(worker.perDayCharge * days);
    }
  };

  const handlePayment = () => {
    navigate('/choosepayment', {
      state: {
        totalAmount,
        days: rangeValue,
        perDayCharge: worker.perDayCharge,
        workerName: worker.name,
        serviceType: worker.category,
        workerId: worker._id,
      },
    });
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/workers/${id}/rating`, {
        rating: rating,
        comment: ratingComment
      });
      setWorker(response.data);
      setRatingSubmitted(true);
      setRatingComment('');
      // Refresh reviews after submission
      fetchReviews();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order if clicking the same sort type
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Change sort type and reset to descending order
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const sortReviews = (reviews) => {
    return [...reviews].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });
  };

  const filterReviews = (reviews) => {
    if (!searchTerm) return reviews;
    return reviews.filter(review => 
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortedAndFilteredReviews = filterReviews(sortReviews(reviewList));

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-amber-500 to-white min-h-screen p-2">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="bg-gradient-to-b from-amber-500 to-white min-h-screen p-2">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Worker not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-500 to-white">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        {/* Worker Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Image */}
            <div className="md:w-1/3">
              <div className="w-[250px] h-[250px] mx-auto overflow-hidden rounded-xl shadow-md">
                <img 
                  src={worker?.imageUrl ? `http://localhost:3001${worker.imageUrl}` : "/user (2).png"} 
                  alt={worker.name} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                />
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{worker.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                  {worker.category}
                </span>
                <div className="flex items-center text-amber-500">
                  <span className="text-xl">★</span>
                  <span className="ml-1 text-gray-700">{worker.rating || '4.5'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-600 mb-1">Experience</h3>
                  <p className="font-semibold">{worker.experience} Years</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-600 mb-1">Languages</h3>
                  <p className="font-semibold">{worker.language}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-600 mb-1">Per Day Charge</h3>
                  <p className="font-semibold">₹{worker.perDayCharge}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-600 mb-1">Start Date</h3>
                  <p className="font-semibold">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
                </div>
              </div>

              {/* Booking Section */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-gray-600 mb-3">Select Duration</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="7"
                    max="60"
                    value={rangeValue}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-semibold min-w-[100px]">{rangeValue} days</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="ml-2 text-2xl font-bold">₹{totalAmount}</span>
                  </div>
                  <button 
                    onClick={handlePayment}
                    className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-600 mb-2">About</h3>
                <p className="text-gray-700">
                  Professional worker with extensive experience in {worker.category}. Committed to providing high-quality service and ensuring client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>
            {!ratingSubmitted && (
              <button
                onClick={() => setRating(rating > 0 ? 0 : 5)}
                className="text-amber-500 hover:text-amber-600"
              >
                Write a Review
              </button>
            )}
          </div>

          {/* Rating Input */}
          {rating > 0 && !ratingSubmitted && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-3xl ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full p-3 border rounded-lg mb-4"
                placeholder="Share your experience with this worker..."
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                rows="3"
              />
              <button
                onClick={handleRatingSubmit}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Submit Review
              </button>
            </div>
          )}

          {/* Success Message */}
          {ratingSubmitted && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
              Thank you for your review! Your feedback helps others make better decisions.
            </div>
          )}

          {/* Reviews List */}
          {loadingReviews ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : reviewList.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-64"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange('date')}
                    className={`px-4 py-2 rounded-lg ${
                      sortBy === 'date' ? 'bg-amber-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`px-4 py-2 rounded-lg ${
                      sortBy === 'rating' ? 'bg-amber-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
              </div>
              {sortedAndFilteredReviews.map((review, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-amber-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
