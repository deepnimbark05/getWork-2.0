import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const ChoosePayment = () => {
  const navigate = useNavigate();
    const handleclick = () => {
      navigate('/successfull');
    }
  return (
    <div class='bg-gradient-to-b from-orange-500 to-white  p-2'>
      <Header />
      <div className=' w-full h-screen p-4 '>
        <div className='w-full h-full bg-indigo-100 p-4 rounded flex  flex-col shadow-lg justify-between'>

          <h1 className='text-center text-3xl font-bold mt-6'>Make Your Payment here </h1>


          <div className='flex flex-col justify-center items-center '>
            <h1 className='text-center text-xl font-semibold'>Total Amount you have to pay : </h1>

            <button className='text-center bg-amber-500 text-white px-15 py-1 rounded mt-3 font-semibold'>INR 7499</button>
          </div>

          <div>
            <h1 className='text-center text-xl font-semibold'>Choose your payment method </h1>
            <div className='flex gap-8 justify-center mt-8 mb-10'>
              <div className='flex gap-4'>
                <div className='h-30 w-30 rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300' onClick={handleclick}>
                  <img src="atm-card (1).png" className='h-16 w-16' alt="" />
                  <p className='mt-2'>Card</p>
                </div>

                <div className='h-30 w-30 rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300' onClick={handleclick}>
                  <img src="payment-method (1).png" className='h-16 w-16' alt="" />
                  <p className='mt-2'>UPI</p>
                </div>

                <div className='h-30 w-30 rounded-full bg-white flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300' onClick={handleclick}>
                  <img src="cash-payment (1).png" className='h-16 w-16' alt="" />
                  <p className='mt-2'>Cash</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChoosePayment