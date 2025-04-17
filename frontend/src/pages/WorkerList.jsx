import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useNavigate, useLocation } from 'react-router-dom'
import WorkerCard from '../components/WorkerCard'
import axios from 'axios'

const WorkerList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortOption, setSortOption] = useState('');
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    
    console.log('Category from URL:', category);

    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/workers');
        console.log('All workers:', response.data);

        const categoryMap = {
          'oldcare': 'Old Care',
          'housecleaning': 'House Cleaning',
          'cook': 'Cook',
          'babysitting': 'Baby Sitting',
          'hometution': 'Home Tution',
          'physiotherapist': 'Physiotherapist'
        };

        const properCategory = categoryMap[category] || category;
        console.log('Looking for workers with category:', properCategory);

        let filteredWorkers = response.data.filter(worker => 
          worker.category === properCategory
        );
        
        // Sort workers based on the selected option
        filteredWorkers = sortWorkers(filteredWorkers, sortOption);
        
        console.log('Filtered and sorted workers:', filteredWorkers);
        setWorkers(filteredWorkers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workers:', error);
        setError('Failed to load workers. Please try again later.');
        setLoading(false);
      }
    };

    if (category) {
      fetchWorkers();
    } else {
      setError('No category selected');
      setLoading(false);
    }
  }, [location.search, sortOption]);

  const sortWorkers = (workers, sortOption) => {
    const sortedWorkers = [...workers];
    
    switch (sortOption) {
      case 'popular':
        // Sort by number of reviews (descending)
        return sortedWorkers.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      case 'highest_review':
        // Sort by rating (descending)
        return sortedWorkers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'oldest':
        // Sort by experience (descending)
        return sortedWorkers.sort((a, b) => (b.experience || 0) - (a.experience || 0));
      default:
        // Default sort (by name)
        return sortedWorkers.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handleWorkerClick = (workerId) => {
    navigate(`/workerdetails/${workerId}`);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div class='bg-gradient-to-b from-amber-500 to-white p-2'>
      <Header />
      <div class="m-4 flex flex items-center justify-between">
        <div>
          <select
            className="bg-white text-black font-bold py-3 px-6 rounded-full shadow-md cursor-pointer hover:bg-grey-200 transition duration-300"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="">Sort by</option>
            <option value="popular">Most Popular</option>
            <option value="highest_review">Highest Review</option>
            <option value="oldest">Most Experienced</option>
          </select>
        </div>
        <div class="font-bold text-gray-700">
          {workers.length} results
        </div>
      </div>
      <hr className="border-t-2 border-white my-4" />
      {error ? (
        <div className="text-center text-red-500 p-4">
          {error}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : workers.length === 0 ? (
        <div className="text-center text-gray-600 p-4">
          No workers found in this category. Please check if the category name matches exactly with what was used when creating the worker.
        </div>
      ) : (
        <div class="flex pl-10 pr-10 justify-center place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {workers.map((worker) => (
            <WorkerCard 
              key={worker._id} 
              worker={worker}
              onClick={() => handleWorkerClick(worker._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default WorkerList