import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser } from 'react-icons/fi';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="relative flex items-center justify-between bg-zinc-100 text-black p-4 rounded">

      <div className='flex items-center justify-between gap-18'>
        <div className="text-2xl font-bold">
          <Link to="/home">
            get<span className="text-orange-500">W</span>ork
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/category" className="hover:underline">Category</Link>
          <Link to="/contactus" className="hover:underline">Contact Us</Link>
        </div>
      </div>

      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pr-10 rounded-md text-black bg-gray-200"
        />
        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
      </div>

      <div
        className="text-3xl cursor-pointer pr-4 hover:text-amber-500 transition-all duration-300"
        onClick={() => setOpen(!open)}
      >
        <FiUser />
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
