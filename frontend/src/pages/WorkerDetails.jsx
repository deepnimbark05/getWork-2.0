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
    <div className="bg-gradient-to-b from-amber-500 to-white p-2">
      <Header />
      <div className="w-full h-screen flex gap-4 p-4">
        <div className="w-3/4 bg-white p-4 rounded shadow-lg">
          <div className="flex p-4 rounded-lg pl-8">
            <div className="w-1/4">
              <img 
                src={worker?.imageUrl ? `http://localhost:3001${worker.imageUrl}` : "/user (2).png"} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover" 
              />
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <h2 className="text-xl font-bold">{worker.name}</h2>
              <p className="text-blue-600 font-semibold">{worker.category}</p>
              <p className="text-orange-400 font-semibold">{worker.rating || '4.5'} ({worker.reviews || 'available'})</p>
              <h2 className="text-l font-bold">Experience: {worker.experience} Years</h2>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4"><p className="font-semibold">Languages</p></div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className="font-semibold">: {worker.language}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4"><p className="font-semibold">Per Day Charge</p></div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className="font-semibold">: INR {worker.perDayCharge}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4"><p className="font-semibold">Duration Date Start</p></div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className="font-semibold">: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4"><p className="font-semibold">Total Days</p></div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <input
                type="range"
                name="daycount"
                min="7"
                max="60"
                value={rangeValue}
                onChange={handleRangeChange}
                className="cursor-pointer w-60"
              />
              <label className="font-semibold"> : {rangeValue} days added</label>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4"><p className="font-semibold">Total Amount</p></div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className="font-semibold">: INR {totalAmount}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4"><p className="font-semibold">Info</p></div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className="font-semibold">: Worker info exchange is a non profit organisation dedicated to helping workers access and gain insight from data collected from them at work.</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className="font-semibold">Rate Worker</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-2xl ${(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
              {rating > 0 && !ratingSubmitted && (
                <>
                  <textarea
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Share your experience with this worker..."
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    rows="3"
                  />
                  <button
                    onClick={handleRatingSubmit}
                    className="bg-amber-500 text-white px-4 py-1 rounded hover:bg-amber-600 w-32"
                  >
                    Submit Rating
                  </button>
                </>
              )}
              {ratingSubmitted && (
                <span className="text-green-600 font-semibold mb-4">Thank you for your rating and feedback!</span>
              )}

              {/* Reviews Display Section */}
              {loadingReviews ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                </div>
              ) : reviewList.length > 0 ? (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">All Reviews ({sortedAndFilteredReviews.length})</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 border rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSortChange('date')}
                          className={`px-3 py-1 rounded flex items-center gap-1 ${
                            sortBy === 'date'
                              ? 'bg-amber-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          Date
                          {sortBy === 'date' && (
                            <span className="text-sm">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => handleSortChange('rating')}
                          className={`px-3 py-1 rounded flex items-center gap-1 ${
                            sortBy === 'rating'
                              ? 'bg-amber-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          Rating
                          {sortBy === 'rating' && (
                            <span className="text-sm">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {sortedAndFilteredReviews.map((review, index) => (
                      <div key={index} className="border rounded p-3 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">
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
                </div>
              ) : (
                <div className="mt-4 text-gray-500">
                  No reviews yet. Be the first to review!
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/4 rounded flex flex-col justify-between">
          <div className="bg-white w-full h-3/8 rounded flex flex-col justify-center items-center">
            <img src="/add-cart_6337186.png" className="h-28 w-28" alt="" />
            <p>Empty Cart</p>
          </div>

          <div className="bg-white w-full items-center flex justify-between p-2 rounded">
            <img src="/discount_2268553.png" className="h-12 w-12" alt="" />
            <p className="font-bold">Get Extra Off <span className="text-sm font-normal">above 3000 !</span></p>
          </div>

          <div className="bg-white w-full h-3/8 rounded flex justify-between items-center p-4">
            <div>
              <p className="font-bold">UC Promise</p>
              <p className="mt-2">Verified Professionals Hassle Free Booking Transparent Pricing</p>
            </div>
            <img src="/verified_18945371.png" className="h-22 w-22" alt="" />
          </div>

          <div className="flex flex-col gap-2">
            <button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded w-full p-0.5 cursor-pointer">ADD TO CART</button>
            <button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded w-full p-0.5 cursor-pointer" onClick={handlePayment}>BOOK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
