import React from 'react'
import Header from '../components/Header'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const WokerDetails = () => {
  const [rangeValue, setRangeValue] = useState(7);
  const navigate = useNavigate();
    const handlepayment = () => {
      navigate('/choosepayment');
    }
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
              <p className='font-semibold'>:  INR {rangeValue * 500} </p>
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
        <div className="w-1/4  rounded flex flex-col justify-between">
          <div className="bg-white w-full h-3/8 rounded flex flex-col justify-center items-center">
          <img src="add-cart_6337186.png " className='h-28 w-28' alt="" />
          <p>Empty Cart</p>
          </div>

          <div className='bg-white w-full items-center flex justify-between p-2 rounded'>
          <img src="discount_2268553.png" className='h-12 w-12 ' alt="" />  
          <p className='font-bold'>Get Extra Off <span className='text-sm font-normal'>above 3000 !</span></p>
          </div>

          <div className="bg-white w-full h-3/8 rounded flex justify-between items-center p-4 `">
            <div>
              <p className='font-bold'>UC Promise</p>
              <p className=' mt-2'>Verified Professionals Hassle Free Booking Transparent Pricing</p>
            </div>
            <img src="verified_18945371.png" className='h-22 w-22' alt="" />
          </div>

          <div className="flex flex-col gap-2">
            <button className="bg-white rounded w-full p-0.5 cursor-pointer">ADD TO CART</button>
            <button className="bg-white rounded w-full p-0.5 cursor-pointer" onClick={handlepayment}>BOOK</button>
          </div>
        </div>


      </div>

    </div>

  )
}

export default WokerDetails