import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
    const handleLogin = () => {
      navigate('/workerlist');
    }
  return (
    <div class=" bg-gradient-to-b from-amber-500 to-white p-2">
        <Header/>
        <div class="p-6 flex h-dvh w-full overflow-hidden">
          <div class="w-2/5 h-full  flex flex-col text-black space-y-4">
            <h1 className="text-5xl font-bold">Hello, <span class="text-white">Smit</span></h1>
            <h1 className="text-5xl font-bold">Get Your</h1>
            <h1 className="text-5xl font-bold">Services at</h1>
            <h1 className="text-5xl font-bold">Your</h1>
            <h1 className="text-5xl font-bold">Doorstep</h1>

          </div>
          <div class="w-3/5 h-full ">
            <img src="home1.png" alt="" class="w-full h-full object-cover"/>
          </div>
        </div>

        <div class="p-6 flex h-dvh w-full overflow-hidden">
          <div class="w-4/6 h-full  ">
            <h1 className='text-4xl font-bold text-white'>What are you Looking for ?</h1>
            <div className='grid grid-cols-3 grid-rows-2 gap-4 p-4 h-90 w-160 mt-20 ' >
              <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200" onClick={handleLogin}>
                <img src="user (2).png" alt="Card 6" class="w-20 h-20 object-cover rounded-full" />
                <h2 class="text-lg font-bold text-black mt-2">Old Care</h2>
              </div>
              <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200" onClick={handleLogin}>
                <img src="user (2).png" alt="Card 6" class="w-20 h-20 object-cover rounded-full" />
                <h2 class="text-lg font-bold text-black mt-2">House Cleaning</h2>
              </div>
              <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200" onClick={handleLogin}>
                <img src="user (2).png" alt="Card 6" class="w-20 h-20 object-cover rounded-full" />
                <h2 class="text-lg font-bold text-black mt-2">Cook</h2>
              </div>
              <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200" onClick={handleLogin}>
                <img src="user (2).png" alt="Card 6" class="w-20 h-20 object-cover rounded-full" />
                <h2 class="text-lg font-bold text-black mt-2">Baby Sitting</h2>
              </div>
              <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200" onClick={handleLogin}>
                <img src="user (2).png" alt="Card 6" class="w-20 h-20 object-cover rounded-+full" />
                <h2 class="text-lg font-bold text-black mt-2">Home Tution</h2>
              </div>
              <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200" onClick={handleLogin}>
                <img src="user (2).png" alt="Card 6" class="w-20 h-20 object-cover rounded-full" />
                <h2 class="text-lg font-bold text-black mt-2">Physiotherapist</h2>
              </div>
            </div>
          </div>
          <div class="w-2/6 h-full ">
            <img src="home2.png" alt="" class="w-full h-full object-cover"/>
          </div>
        </div>

        <div>
          <img src="add1.webp" alt="" />
        </div>

        <h1 className='text-2xl font-semibold text-black mt-4'>Services Product </h1>
        <div className='mt-4 flex gap-4'>
          <div><img src="addmini1.webp" alt="" /></div>
          <div><img src="addmini2.webp" alt="" /></div>
          <div><img src="addmini3.webp" alt="" /></div>
          
        </div>
        <h1></h1>
        <div className='flex justify-between m-20 mt-8'>
          <div>
            <h1 className='text-2xl font-semibold text-black mt-1 '>Company</h1>
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
            <h1 className='text-2xl font-semibold text-black mt-1 '>For Partners</h1>
            <h2 className='text-1xl font-semibold text-black mt-1'>Register as a professional</h2>
          </div>
          <div>
            <h1 className='text-2xl font-semibold text-black mt-1'>Social Links</h1>
            <div>
              <img src="playstore.webp" alt="" className='w-34 h-10 mt-6'/>
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