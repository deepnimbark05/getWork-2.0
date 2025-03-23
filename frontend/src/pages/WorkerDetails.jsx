import React from 'react'
import Header from '../components/Header'
import { useState } from 'react';
const WokerDetails = () => {
  const [rangeValue, setRangeValue] = useState(7);
  return (
    <div class='bg-amber-500  p-2'>
      <Header />
      <div className='w-full h-screen flex gap-4 p-4'>
        <div className='w-3/4 bg-white p-4 rounded'>

          <div className="flex  p-4 rounded-lg pl-8">
            {/* Profile Picture */}
            <div className="w-1/4">
              <img src="user (2).png" alt="Profile" className="w-40 h-40 rounded-full" />
            </div>
            {/* Title & Name */}
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <h2 className="text-xl font-bold">Dr. Smit Dodiya</h2>
              <p className="text-blue-600 font-semibold">Physiotherapy</p>
              <p className="text-orange-400 font-semibold">4.5 (available)</p>
              <h2 className="text-l font-bold font-semibold">Experience : 9 Years</h2>

            </div>
          </div>

          <div className="flex  p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Languages</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>:  English, Hindi, Gujarati</p>
            </div>
          </div>

          <div className="flex  p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Per Day Charge</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>:  INR 500</p>
            </div>
          </div>

          <div className="flex  p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Duration Date Start</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>:  15 DEC</p>
            </div>
          </div>

          <div className="flex  p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Total Days</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <input 
              type="range" 
              name="daycount" 
              min="7" 
              max="60"
              value={rangeValue}
              onChange={(e) => setRangeValue(e.target.value)}
              className='cursor-pointer w-60'
              />
              <label className='font-semibold'> : {rangeValue} days added</label>
            </div>
          </div>

          <div className="flex  p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Total Amount</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>:  INR {rangeValue*500} </p>
            </div>
          </div>

          <div className="flex  p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Info</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>:  Worker info exchange is a non profit organisation dedicated to helping workers access and gain insight from data collected from them at work.</p>
            </div>
          </div>

        </div>
        <div className='w-1/4 bg-white p-4 rounded'>
        <button className='bg-orange-400 rounded w-full'>ADD TO CART</button>
        
        <button className='bg-orange-400 rounded w-full mt-3'>BOOK</button>

        </div>

      </div>
    </div>
  )
}

export default WokerDetails