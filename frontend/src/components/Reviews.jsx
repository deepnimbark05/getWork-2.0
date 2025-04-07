import { Link } from 'react-router-dom';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Jons Sena",
      date: "2 days ago",
      text: "Excellent service! The professionalism and attention to detail were outstanding. Highly recommended!",
      rating: 5,
      score: 4.5
    },
    {
      id: 2,
      name: "Sofia",
      date: "2 days ago",
      text: "Great experience! The service was prompt, and the quality exceeded my expectations.",
      rating: 4,
      score: 4.0
    },
    {
      id: 3,
      name: "Anandreansyah",
      date: "2 days ago",
      text: "Reliable and efficient! I appreciate the professionalism and dedication of the team.",
      rating: 5,
      score: 4.5
    },
    {
      id: 4,
      name: "Jons Sena",
      date: "2 days ago",
      text: "Outstanding customer support and seamless service. Will definitely use again!",
      rating: 5,
      score: 4.5
    },
    {
      id: 5,
      name: "Sofia",
      date: "2 days ago",
      text: "Very satisfied with the service. The process was smooth and efficient.",
      rating: 4,
      score: 4.0
    },
    {
      id: 6,
      name: "Anandreansyah",
      date: "2 days ago",
      text: "Great experience overall. The team was courteous and highly skilled.",
      rating: 5,
      score: 4.5
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i}>{i < rating ? "⭐" : "☆"}</span>
    ));
  };

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
            <h3 className="text-xl font-bold mb-5">Customer Reviews</h3>
            <div className="flex flex-wrap gap-5 justify-start">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow-md w-full sm:w-[300px]">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src="/images/review.png" 
                      alt="User" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h5 className="font-bold text-base m-0">{review.name}</h5>
                      <span className="text-gray-500 text-xs">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">"{review.text}"</p>
                  <div className="flex justify-between items-center">
                    <div className="text-yellow-400">
                      {renderStars(review.rating)}
                    </div>
                    <span className="font-medium">{review.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;