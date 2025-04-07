import React from 'react'
import Header from '../components/Header'
const CreateWorker = () => {
    return (
        <div class='bg-amber-500  p-2'>
            <Header />
            <div className='w-full h-screenp-4 p-4'>
                <div className='w-full h-screen bg-indigo-100 p-4 rounded'>
                    <h1 className='text-3xl font-semibold'>Make your Profile !</h1>
                    <div className="flex  p-2 rounded-lg pl-8">
                        <div className="w-1/2 pt-2">
                            <img src="user (2).png" className="h-30 w-30" alt="" />
                        </div>
                        <div className="w-1/2 flex justify-end items-center">
                            <button className='bg-orange-400 rounded w-20 p-2 font-semibold text-white cursor-pointer hover:bg-orange-500 transition-all duration-300'>Save</button>
                            <button className='bg-orange-400 rounded w-20 p-2 font-semibold text-white ml-4 cursor-pointer hover:bg-orange-500 transition-all duration-300'>Edit</button>


                        </div>
                    </div>

                    <div className="flex pl-8 pr-8 gap-3 mt-5">
                        <div className="w-1/2 pt-2 ">
                            <p>First Name</p>
                            <input type="text" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" placeholder='Your firstname' />
                        </div>
                        <div className="w-1/2 pt-2">
                            <p>Last Name</p>
                            <input type="text" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" placeholder='Your lastname' />
                        </div>
                    </div>
                    <div className="flex pl-8 pr-8 gap-3 mt-3">
                        <div className="w-1/2 pt-2 ">
                            <p>Gender</p>
                            <select name="gender" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" id="">
                                <option value="male">Male</option>
                                <option value="female">Female</option>

                            </select>
                        </div>
                        <div className="w-1/2 pt-2">
                            <p>Categories</p>
                            <select name="categories" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" id="">
                                <option value="1">Old Care</option>
                                <option value="2">House Cleaning</option>
                                <option value="3">Cook</option>
                                <option value="4">Baby Sitting</option>
                                <option value="5">Home Tution</option>
                                <option value="6">Physiotherapist</option>


                            </select>
                        </div>
                    </div>
                    <div className="flex pl-8 pr-8 gap-3 mt-3">
                        <div className="w-1/2 pt-2 ">
                            <p>Language</p>
                            <select name="gender" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" id="">
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="gujarati">Gujarati</option>


                            </select>
                        </div>
                        <div className="w-1/2 pt-2">
                            <p>Phone no.</p>
                            <input type="text" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" placeholder='Enter your phone number' />
                        </div>
                    </div>
                    <div className="flex pl-8 pr-8 gap-3 mt-3">
                        <div className="w-1/2 pt-2 ">
                            <p>Email</p>
                            <input type="text" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" placeholder='Enter your Email' />
                        </div>
                        <div className="w-1/2 pt-2">
                            <p>Experiaece</p>
                            <input type="text" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" placeholder='Enter your experiance' />
                        </div>
                    </div>
                    <div className="flex pl-8 pr-8 gap-3 mt-3">
                        <div className="w-1/2 pt-2 ">
                            <p>Per Day Charge</p>
                            <input type="text" className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" placeholder='Enter your Per day Charge' />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateWorker