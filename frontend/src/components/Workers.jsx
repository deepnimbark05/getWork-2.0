import { Link } from 'react-router-dom';

const Workers = () => {
  const workers = [
    {
      id: 1,
      name: "Dr. Smit Dodiya",
      designation: "Consultant - Physiotherapy",
      rating: 4.5,
      available: true,
      experience: "9 Years",
      languages: "English, Hindi, Gujarati",
      image: "/images/doctor.jpg"
    },
    {
      id: 2,
      name: "Dr. Smit Dodiya",
      designation: "Consultant - Physiotherapy",
      rating: 4.5,
      available: true,
      experience: "9 Years",
      languages: "English, Hindi, Gujarati",
      image: "/images/man.jpg"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
        <h2 className="text-orange-600 m-0 text-xl">
          get<span className="text-black">Work</span>
        </h2>
        <h2 className="m-0 text-xl">Workers</h2>
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
        <div className="ml-40 w-[calc(100%-10rem)] p-5">
          <h3 className="text-xl font-bold mb-5">Workers Page</h3>
          <p className="mb-5">Configure your application Workers here.</p>

          <div className="flex flex-col gap-4">
            {workers.map((worker) => (
              <div key={worker.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={worker.image} 
                  alt="Worker" 
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div className="flex-grow">
                  <h4 className="text-lg font-bold">{worker.name}</h4>
                  <p className="text-gray-600 text-sm">{worker.designation}</p>
                  <div className="flex items-center mt-1">
                    <img src="/images/star.png" alt="Rating" className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {worker.rating} 
                      <a href="#" className="text-blue-500 ml-1">
                        {worker.available ? "(available)" : "(unavailable)"}
                      </a>
                    </span>
                  </div>
                  <p className="text-sm mt-1">Experience: {worker.experience}</p>
                  <p className="text-sm">Languages: {worker.languages}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workers;