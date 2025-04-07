import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const handleworkerprofile =()=>{
  //   navigate('/createworker');
  // }
  return (
    <header className="relative flex items-center justify-between bg-zinc-100 text-black p-4 rounded">
      
      <div className='flex items-center justify-between gap-18'>
        <div className="text-2xl font-bold">
          <Link to="/">getWork</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/category" className="hover:underline">Category</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>

      <div className="w-96">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 rounded-md text-black bg-gray-200"
        />
      </div>

      <div className="text-2xl cursor-pointer" onClick={() => setOpen(!open)}>
        👤
      </div>

      {open && (
        <div className="absolute right-2 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-300 py-2 z-10">
          <Link 
            to="/createworker" 
            className="block px-4 py-2 text-black font-semibold hover:bg-amber-500 hover:text-white hover:underline transition-all duration-200 whitespace-nowrap"
          >
            Make your profile as worker
          </Link>

          <Link 
            to="/notification" 
            className="block px-4 py-2 text-black font-semibold hover:bg-amber-500 hover:text-white hover:underline transition-all duration-200"
          >
            Notification
          </Link>

          <button 
            className="block w-full text-left px-4 py-2 text-black font-semibold hover:bg-amber-500 hover:text-white hover:underline transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
