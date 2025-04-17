import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenReviews, setHiddenReviews] = useState(new Set());

  const toggleReviewVisibility = async (reviewId, workerId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/workers/${workerId}/reviews/${reviewId}/toggle`
      );
      
      // Update the reviews list with the new data
      const updatedReviews = reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            isDisabled: !review.isDisabled
          };
        }
        return review;
      });
      
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error toggling review visibility:', error);
    }
  };

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        // First, get all workers
        const workersResponse = await axios.get('http://localhost:3001/api/workers');
        const workers = workersResponse.data;

        // Fetch reviews for each worker
        const allReviews = [];
        for (const worker of workers) {
          if (worker.reviewList && worker.reviewList.length > 0) {
            worker.reviewList.forEach(review => {
              allReviews.push({
                id: review._id,
                workerId: worker._id,
                workerName: worker.name,
                workerCategory: worker.category,
                workerImage: worker.imageUrl,
                rating: review.rating,
                comment: review.comment,
                date: new Date(review.date).toLocaleDateString(),
                score: review.rating,
                isDisabled: review.isDisabled
              });
            });
          }
        }

        // Sort reviews by date (newest first)
        allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(allReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className="text-xl">{i < rating ? "⭐" : "☆"}</span>
    ));
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
          <h2 className="text-orange-600 m-0 text-xl">
            get<span className="text-black">Work</span>
          </h2>
          <h2 className="m-0 text-xl">Admin Panel - Reviews</h2>
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            Home
          </Link>
        </div>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
          <h2 className="text-orange-600 m-0 text-xl">
            get<span className="text-black">Work</span>
          </h2>
          <h2 className="m-0 text-xl">Admin Panel - Reviews</h2>
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            Home
          </Link>
        </div>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
        <h2 className="text-orange-600 m-0 text-xl">
          get<span className="text-black">Work</span>
        </h2>
        <h2 className="m-0 text-xl">Admin Panel - Reviews</h2>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Home
        </Link>
      </div>

      {/* Container Wrapper */}
      <div className="flex pt-12">
        {/* Sidebar */}
        <div className="w-40 h-[calc(100vh-3rem)] bg-gray-900 text-white fixed top-12 left-0 overflow-y-auto pt-5 shadow-lg">
          <Link to="/Dashboard" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Dashboard
          </Link>
          <Link to="/Carousel" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Carousel
          </Link>
          <Link to="/Reviews" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Reviews
          </Link>
          <Link to="/Workers" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Workers
          </Link>
        </div>

        {/* Main Content */}
        <div className="ml-40 w-[calc(100%-10rem)]">
          <div className="p-5">
            <h3 className="text-xl font-bold mb-5">Customer Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No reviews available yet.
              </div>
            ) : (
              <div className="flex flex-wrap gap-5 justify-start">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow-md w-full sm:w-[300px]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={review.workerImage ? `http://localhost:3001${review.workerImage}` : "/images/review.png"} 
                          alt={review.workerName} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h5 className="font-bold text-base m-0">{review.workerName}</h5>
                          <p className="text-sm text-gray-600 m-0">{review.workerCategory}</p>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleReviewVisibility(review.id, review.workerId)}
                        className={`p-2 rounded-full hover:bg-gray-100 ${
                          review.isDisabled ? 'text-red-500' : 'text-gray-500'
                        }`}
                        title={review.isDisabled ? "Enable Review" : "Disable Review"}
                      >
                        {review.isDisabled ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {!hiddenReviews.has(review.id) && (
                      <>
                        <p className="text-gray-700 text-sm mb-3">"{review.comment}"</p>
                        <div className="flex justify-between items-center">
                          <div className="text-yellow-400">
                            {renderStars(review.rating)}
                          </div>
                          <span className="font-medium">{review.score.toFixed(1)}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;