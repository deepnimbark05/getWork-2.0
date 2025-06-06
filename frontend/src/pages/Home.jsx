import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HomeCarousel from '../components/Carousel'

const Home = () => {
  const [name, setName] = useState('Guest');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.name);
    }
  }, []);

  const handleCategoryClick = (category) => {
    // Create a map for category URLs
    const categoryMap = {
      'Old Care': 'oldcare',
      'House Cleaning': 'housecleaning',
      'Cook': 'cook',
      'Baby Sitting': 'babysitting',
      'Home Tution': 'hometution',
      'Physiotherapist': 'physiotherapist'
    };
    
    const categoryUrl = categoryMap[category];
    navigate(`/workerlist1?category=${categoryUrl}`);
  };

  return (
    <div className="bg-gradient-to-b from-amber-500 to-white p-2">
      <Header />
      
      {/* Carousel Section */}
      <div className="mb-8">
        <HomeCarousel />
      </div>

      <div className="p-6 flex h-dvh w-full overflow-hidden">
        <div className="w-2/5 h-full flex flex-col text-black space-y-4">
          <h1 className="text-5xl font-bold">Hello, <span className="text-white">{name || "Guest"}</span></h1>
          <h1 className="text-5xl font-bold">Get Your</h1>
          <h1 className="text-5xl font-bold">Services at</h1>
          <h1 className="text-5xl font-bold">Your</h1>
          <h1 className="text-5xl font-bold">Doorstep</h1>
        </div>
        <div className="w-3/5 h-full">
          <img src="home1.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="p-6 flex h-dvh w-full overflow-hidden">
        <div className="w-4/6 h-full">
          <h1 className='text-4xl font-bold text-white'>What are you Looking for ?</h1>
          <div className='grid grid-cols-3 grid-rows-2 gap-5 p-1 h-95 w-160 mt-10'>
            {[
              { img: 'exercising.png', title: 'Old Care' },
              { img: 'broom.png', title: 'House Cleaning' },
              { img: 'cooking.png', title: 'Cook' },
              { img: 'baby.png', title: 'Baby Sitting' },
              { img: 'classroom.png', title: 'Home Tution' },
              { img: 'physical.png', title: 'Physiotherapist' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
                onClick={() => handleCategoryClick(item.title)}
              >
                <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 hover:border-blue-400 transition duration-300" />
                <h2 className="text-lg font-semibold text-black mt-4 mb-6">{item.title}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/6 h-full">
          <img src="home2.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div>
        <img src="add1.webp" alt="" />
      </div>

      <h1 className='text-2xl font-semibold text-black mt-4'>Services Product</h1>
      <div className='mt-4 flex gap-4'>
        <div><img src="addmini1.webp" alt="" /></div>
        <div><img src="addmini2.webp" alt="" /></div>
        <div><img src="addmini3.webp" alt="" /></div>
      </div>
      
      <div className='flex justify-between m-20 mt-8'>
        <div>
          <h1 className='text-2xl font-semibold text-black mt-1'>Company</h1>
          <h2 className='text-1xl font-semibold text-black mt-1'>About Us</h2>
          <h2 className='text-1xl font-semibold text-black mt-1'>Terms & Conditions</h2>
          <h2 className='text-1xl font-semibold text-black mt-1'>Privacy Policy</h2>
          <h2 className='text-1xl font-semibold text-black mt-1'>About Us</h2>
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-black mt-1'>For Customers</h1>
          <h2 className='text-1xl font-semibold text-black mt-1'>Reviews</h2>
          <h2 className='text-1xl font-semibold text-black mt-1'>Blog</h2>
          <h2 className='text-1xl font-semibold text-black mt-1'>Contact Us</h2>
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-black mt-1'>For Partners</h1>
          <h2 className='text-1xl font-semibold text-black mt-1'>Register as a professional</h2>
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-black mt-1'>Social Links</h1>
          <div>
            <img src="playstore.webp" alt="" className='w-34 h-10 mt-6' />
          </div>
          <div>
            <img src="appstore.webp" alt="" className='w-34 h-10 mt-1' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home