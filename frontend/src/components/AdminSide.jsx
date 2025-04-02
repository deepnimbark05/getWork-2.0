import React from 'react'
import { Link } from "react-router-dom";

const AdminSide = () => {
    return (

        <div className="w-1/5 bg-black p-4">
            <div className="text-m font-semibold text-white flex flex-col">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/carousel">Carousel</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/settings">Settings</Link>

            </div>
        </div>

    )
}

export default AdminSide