import React from 'react'

const WorkerCard = ({ worker, onClick }) => {
  return (
    <div 
      className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100 w-60"
      onClick={onClick}
    >
      <img 
        src={worker.imageUrl ? `http://localhost:3001${worker.imageUrl}` : "/user (2).png"} 
        alt={worker.name} 
        className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 hover:border-blue-400 transition duration-300" 
      />
      <h2 className="text-lg font-semibold text-black mt-4">{worker.name}</h2>
      <p className="text-sm text-gray-600">{worker.category}</p>
      <div className="flex items-center mt-2">
        <span className="text-amber-500">★</span>
        <span className="text-sm text-gray-600 ml-1">{worker.rating} ({worker.reviews} reviews)</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Experience: {worker.experience}</p>
        <p>Per Day: ₹{worker.perDayCharge}</p>
      </div>
    </div>
  )
}

export default WorkerCard
