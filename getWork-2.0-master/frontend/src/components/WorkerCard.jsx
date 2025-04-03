import React from 'react'

const WorkerCard = ({ onClick }) => {
  return (
    <div class="w-62 h-60 pt-8 bg-white shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-200"
    onClick={onClick} 
    >
        <img src="user (2).png" alt="" class="w-35 h-35 rounded-full"/>
        <h2 class="text-xl font-bold text-black">Dr Smit Dodiya</h2>
        <p class="text-blue-600 font-bold mt-2">Physiotherapy</p>
        <br />
    </div>
  )
}

export default WorkerCard