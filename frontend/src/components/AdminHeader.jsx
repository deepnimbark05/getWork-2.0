import React from 'react';
import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <header className="flex items-center justify-between bg-zinc-100  text-black p-4 rounded">
            <div className='flex items-center justify-between '>

                <div className="text-2xl font-bold">
                    <Link to="/">getWork</Link>
                </div>

            </div>

            <div className='text-3xl font-bold'>Admin Panel</div>

            <div className="text-2xl cursor-pointer">
                👤
            </div>
        </header>
    )
}

export default AdminHeader