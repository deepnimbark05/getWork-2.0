import React from 'react'
import Header from '../components/Header'
const Notification = () => {
    return (
        <div className='bg-amber-500 min-h-screen p-2'>
            <Header />

            <div className='p-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center place-items-center'>
                    <div className='w-60 h-64 bg-white shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col items-center justify-center text-center hover:bg-gray-200 transition-all duration-300'>
                        <img src="user (2).png" alt="" className="w-24 h-24 rounded-full mb-4" />
                        <h2 className="text-xl font-bold text-black">Dr Smit Dodiya</h2>
                        <p className="text-blue-600 font-bold mt-2">Work to do</p>
                        <button className='w-full bg-amber-500 rounded p-2 text-white mt-6 cursor-pointer hover:bg-amber-600 transition-all duration-300'>
                            Ok, Thank You
                        </button>
                    </div>
                    <div className='w-60 h-64 bg-white shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col items-center justify-center text-center  hover:bg-gray-200 transition-all duration-300'>
                        <img src="user (2).png" alt="" className="w-24 h-24 rounded-full mb-4" />
                        <h2 className="text-xl font-bold text-black">Dr Smit Dodiya</h2>
                        <p className="text-blue-600 font-bold mt-2">Work to do</p>
                        <button className='w-full bg-amber-500 rounded p-2 text-white mt-6 cursor-pointer hover:bg-amber-600 transition-all duration-300'>
                            Ok, Thank You
                        </button>
                    </div>
                    <div className='w-60 h-64 bg-white shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col items-center justify-center text-center  hover:bg-gray-200 transition-all duration-300'>
                        <img src="user (2).png" alt="" className="w-24 h-24 rounded-full mb-4" />
                        <h2 className="text-xl font-bold text-black">Dr Smit Dodiya</h2>
                        <p className="text-blue-600 font-bold mt-2">Work to do</p>
                        <button className='w-full bg-amber-500 rounded p-2 text-white mt-6 cursor-pointer hover:bg-amber-600 transition-all duration-300'>
                            Ok, Thank You
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Notification