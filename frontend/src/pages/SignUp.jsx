import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/');
    }
    return (
        <div class="flex items-center justify-center min-h-screen bg-amber-500 p-4 h-screen">

            <div className='bg-white pl-6 pr-6 pt-2 pb-4 rounded-2xl w-100 rounded'>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold">Signup</h2>
                        <h2 className="text-xl ">to get started</h2>
                    </div>
                    <div>
                        <img src="incon.png" alt="Signup Icon" className="w-40 h-40 object-contain" />
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded-lg "
                />
                <input
                    type="text"
                    placeholder="Enter your Email"
                    className="w-full p-2 border rounded-lg mt-6"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded-lg mt-4"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded-lg mt-4"
                />

                <div className='flex mt-8 item-center'>

                    <input className="cursor-pointer" type="checkbox" />
                    <p className='ml-2'>Agree to Our terms and Conditions</p>
                </div>


                <button className='w-full bg-amber-500 rounded p-2 text-white mt-10 cursor-pointer hover:bg-amber-600' onClick={handleSignup}>Continue</button>

                <p className='text-center mt-8'>Already Registered? <span className='font-bold hover:underline cursor-pointer' onClick={handleSignup}>Login</span></p>

            </div>
        </div>
    )
}

export default SignUp