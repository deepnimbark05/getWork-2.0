import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-zinc-100  text-black p-4 rounded">
        <div className='flex items-center justify-between gap-18'>

      <div className="text-2xl font-bold">
        <Link to="/">getWork</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/category" className="hover:underline">Category</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
      </div>
        </div>

        
      <div className="w-96 ">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 rounded-md text-black bg-gray-200"
        />
      </div>
      <div className="text-2xl cursor-pointer">
        👤
      </div>
    </header>
  );
};

export default Header;
