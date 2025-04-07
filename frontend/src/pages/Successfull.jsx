import React from 'react'
import Header from '../components/Header'
const Successfull = () => {
    return (
        <div className='bg-gradient-to-b from-orange-500 to-white  p-2'>
            <Header />
            <div className='w-full h-screen p-4 '>
                <div className='w-full h-full bg-indigo-100  flex flex-col shadow-lg justify-between items-center'>
                    <div className=' flex flex-col items-center'>

                        <img src="incon.png" alt="get work logo" className="w-60 h-60 " />
                        <h1 className='text-center text-4xl font-bold'>Successfull !</h1>
                        <h1 className='text-center text-4xl font-bold'>Thank you for trusting Us</h1>
                    </div>
                    <img src="send-money.png" alt="send money done" className='w-40 h-40 object-contain mb-10' />
                </div>

            </div>
        </div>
    )
}

export default Successfull