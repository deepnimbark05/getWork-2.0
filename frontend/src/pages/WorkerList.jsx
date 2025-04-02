import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import WorkerCard from '../components/WorkerCard'
import { useNavigate } from 'react-router-dom'

const WorkerList = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    navigate('/workerdetails');
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Here, you can implement sorting logic if needed
    console.log("Selected sort option:", event.target.value);
  };

  return (
    <div class='bg-amber-500  p-2'>
      <Header />
      <div class="m-4 flex flex items-center justify-between">
        <div>
          <select
            className="bg-white text-black font-bold py-3 px-6 rounded-full  shadow-md cursor-pointer hover:bg-grey-200  transition duration-300"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="">Sort by</option>
            <option value="popular">Most Popular</option>
            <option value="highest_review">Highest Review</option>
            <option value="oldest">Oldest Worker</option>
          </select>
        </div>
        <div class="font-bold text-gray-700">
          1927 results
        </div>
      </div>
      <hr className="border-t-2 border-white my-4" />
      <div class=" flex justify-center place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
        <WorkerCard onClick={handleLogin} />
      </div>





    </div>
  )
}

export default WorkerList