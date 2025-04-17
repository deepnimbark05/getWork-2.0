import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {name, password })
      .then(result => {
        if(result.data.status === "success"){
          // Store name in localStorage
          localStorage.setItem('userName', result.data.name);
          navigate('/home');
        }
      })
      .catch(err => console.log(err));
  };

  // const handleLogin = () => {
  //   navigate('/home');
  // }
  const handleregister = () => {
    navigate('/signup');
  }

  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-500 to-white  p-4 h-screen">

      <div className='bg-white  pl-6 pr-6 pb-6 rounded-2xl w-100 rounded'>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Login</h2>
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
            className="w-full p-2 border rounded-lg mt-2"
            name='name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg mt-4"
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className='text-s  mt-2 hover:underline cursor-pointer'>Forgot Password ?</h1>
          <button className='w-full bg-amber-500 rounded p-2 text-white mt-10 cursor-pointer hover:bg-amber-600' >Continue</button>
          </form>
          <p className='text-center mt-8'>New User? <span className='font-bold cursor-pointer hover:underline' onClick={handleregister}>Register</span></p>

      </div>
    </div>
  )
}

export default Login