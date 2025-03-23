import React from 'react'
import Header from '../components/Header'
const ChoosePayment = () => {
  return (
    <div class='bg-amber-500  p-2'>
        <Header/>
        <div className=' w-full h-screen p-4 '>
            <div className='w-full h-screen bg-indigo-100 p-4 rounded'>
            <h1 className='text-center text-3xl font-bold mt-6'>Make Your Payment here </h1>


            <div className='flex flex-col justify-center items-center mt-16'>
            <h1 className='text-center text-xl font-semibold'>Total Amount you have to pay : </h1>

            <button className='text-center bg-amber-500 text-white w-50 rounded mt-3'>INR 7499</button>
            </div>

            <h1 className='text-center text-xl font-semibold mt-16'>Choose your payment method </h1>

            <div className='flex gap-8 justify-center mt-8'>
                <div className='h-30 w-30 rounded-full bg-white'></div>
                <div className='h-30 w-30 rounded-full bg-white'></div>
                <div className='h-30 w-30 rounded-full bg-white'></div>


            </div>



            </div>
        </div>
    </div>
  )
}

export default ChoosePayment