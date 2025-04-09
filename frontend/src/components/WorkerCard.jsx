import React from 'react'

const WorkerCard = ({ onClick }) => {
  return (
    <div 
      className="w-60 h-70 bg-white shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 duration-300"
      onClick={onClick}
    >
      <img src="user (2).png" alt="Profile" className="w-44 h-44 rounded-full" />
      <h2 className="text-xl font-bold text-black mt-2">Dr Smit Dodiya</h2>
      <p className="text-blue-600 font-bold mt-2">Physiotherapy</p>
      <br />
    </div>
  )
}

export default WorkerCard
