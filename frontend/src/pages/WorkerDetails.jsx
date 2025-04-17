import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const WorkerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rangeValue, setRangeValue] = useState(7);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/workers/${id}`);
        setWorker(response.data);
        // Initialize total amount with default 7 days
        setTotalAmount(response.data.perDayCharge * 7);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching worker details:', error);
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [id]);

  const handleRangeChange = (e) => {
    const days = parseInt(e.target.value);
    setRangeValue(days);
    if (worker) {
      setTotalAmount(worker.perDayCharge * days);
    }
  };

  const handlePayment = () => {
    navigate(`/choosepayment?workerId=${worker._id}&days=${rangeValue}&amount=${totalAmount}`);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-amber-500 to-white min-h-screen p-2">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="bg-gradient-to-b from-amber-500 to-white min-h-screen p-2">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Worker not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-b from-amber-500 to-white p-2'>
      <Header />
      <div className='w-full h-screen flex gap-4 p-4'>
        <div className='w-3/4 bg-white p-4 rounded shadow-lg'>
          <div className="flex p-4 rounded-lg pl-8">
            <div className="w-1/4">
              <img src="/user (2).png" alt="Profile" className="w-40 h-40 rounded-full" />
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <h2 className="text-xl font-bold">{worker.name}</h2>
              <p className="text-blue-600 font-semibold">{worker.category}</p>
              <p className="text-orange-400 font-semibold">{worker.rating} ({worker.reviews} reviews)</p>
              <h2 className="text-l font-bold font-semibold">Experience: {worker.experience} years</h2>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Languages</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>: {worker.language}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Per Day Charge</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>: INR {worker.perDayCharge}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Duration Date Start</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
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
                onChange={handleRangeChange}
                className='cursor-pointer w-60'
              />
              <label className='font-semibold'> : {rangeValue} days added</label>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Total Amount</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>: INR {totalAmount}</p>
            </div>
          </div>

          <div className="flex p-2 rounded-lg pl-8">
            <div className="w-1/4">
              <p className='font-semibold'>Info</p>
            </div>
            <div className="w-3/4 flex flex-col justify-center pl-4">
              <p className='font-semibold'>: Worker info exchange is a non profit organisation dedicated to helping workers access and gain insight from data collected from them at work.</p>
            </div>
          </div>
        </div>

        <div className="w-1/4 rounded flex flex-col justify-between">
          <div className="bg-white w-full h-3/8 rounded flex flex-col justify-center items-center">
            <img src="/add-cart_6337186.png" className='h-28 w-28' alt="" />
            <p>Empty Cart</p>
          </div>

          <div className='bg-white w-full items-center flex justify-between p-2 rounded'>
            <img src="/discount_2268553.png" className='h-12 w-12' alt="" />
            <p className='font-bold'>Get Extra Off <span className='text-sm font-normal'>above 3000 !</span></p>
          </div>

          <div className="bg-white w-full h-3/8 rounded flex justify-between items-center p-4">
            <div>
              <p className='font-bold'>UC Promise</p>
              <p className='mt-2'>Verified Professionals Hassle Free Booking Transparent Pricing</p>
            </div>
            <img src="/verified_18945371.png" className='h-22 w-22' alt="" />
          </div>

          <div className="flex flex-col gap-2">
            <button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded w-full p-0.5 cursor-pointer">ADD TO CART</button>
            <button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded w-full p-0.5 cursor-pointer" onClick={handlePayment}>BOOK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;