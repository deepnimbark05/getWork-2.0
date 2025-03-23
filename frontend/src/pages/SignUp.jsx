import React from 'react'

const SignUp = () => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-amber-500 p-4 h-screen">

        <div className='bg-white p-6 rounded-2xl w-100 rounded'>
            <h2 className='text-2xl font-semibold  '>Signup</h2>
            <h2 className='text-1xl  mb-4'>to get started</h2>
            <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border rounded-lg mt-6"
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

            <input type="checkbox" />
            <p className='ml-2'>Agree to Our terms and Conditions</p>
            </div>


            <button className='w-full bg-amber-500 rounded p-2 text-white mt-10'>Continue</button>

            <p className='text-center mt-8'>Already Registered? <span className='font-bold'>Login</span></p>

        </div>
    </div>
  )
}

export default SignUp