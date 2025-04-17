import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/workers');
      setWorkers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setError('Failed to load workers. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (workerId) => {
    if (!window.confirm('Are you sure you want to delete this worker? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3001/api/workers/${workerId}`);
      
      if (response.status === 200) {
        // Remove the worker from the local state
        setWorkers(workers.filter(worker => worker._id !== workerId));
        setError(null);
      } else {
        throw new Error('Failed to delete worker');
      }
    } catch (error) {
      console.error('Error deleting worker:', error);
      setError('Failed to delete worker. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = (worker) => {
    navigate('/editworker', { state: { worker } });
  };

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
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold">Workers Page</h3>
            <Link to="/createworker" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add New Worker
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : workers.length === 0 ? (
            <div className="text-center text-gray-600 p-4">
              No workers found. Click "Add New Worker" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map((worker) => (
                <div key={worker._id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <img 
                      src={worker.imageUrl ? `http://localhost:3001${worker.imageUrl}` : "/user (2).png"} 
                      alt={worker.name} 
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h4 className="text-lg font-bold">{worker.name}</h4>
                      <p className="text-gray-600 text-sm">{worker.category}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm ml-1">
                          {worker.rating || '4.5'} ({worker.reviews || '0'} reviews)
                        </span>
                      </div>
                      <p className="text-sm mt-1">Experience: {worker.experience} years</p>
                      <p className="text-sm">Language: {worker.language}</p>
                      <p className="text-sm">Per Day: ₹{worker.perDayCharge}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Link 
                      to={`/workerdetails/${worker._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </Link>
                    <button 
                      onClick={() => handleEdit(worker)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(worker._id)}
                      disabled={deleteLoading}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                    >
                      {deleteLoading ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workers;