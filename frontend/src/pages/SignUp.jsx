import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/'); // Only navigate after successful registration
            })
            .catch(err => console.log(err));
    };

    // const handleSignup = () => {
    //     navigate('/');
    // }
    return (
        <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-500 to-white p-4 h-screen">

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
                <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded-lg "
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your Email"
                    className="w-full p-2 border rounded-lg mt-6"
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded-lg mt-4"
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}

                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded-lg mt-4"
                    // name='password'
                />

                <div className='flex mt-8 item-center'>

                    <input className="cursor-pointer" type="checkbox" />
                    <p className='ml-2'>Agree to Our terms and Conditions</p>
                </div>


                <button type='submit' className='w-full bg-amber-500 rounded p-2 text-white mt-10 cursor-pointer hover:bg-amber-600' >Continue</button>

                </form>
                <p className='text-center mt-8'>Already Registered? <span className='font-bold hover:underline cursor-pointer' >Login</span></p>

            </div>
        </div>
    )
}

export default SignUp