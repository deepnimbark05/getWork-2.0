import React from 'react'
// import AdminDashboard from '../components/AdminDashboard'
import AdminSide from '../components/Carousel'
import Reviews from '../components/Reviews'
const AdminHome = () => {
    return (
        <div class='bg-black  h-full p-2'>
            <AdminHeader />
            <div className="flex h-screen w-full p-6">
                <AdminSide/>
                <div className="w-4/5 bg-gray-100 p-4 rounded">
                
                </div>
            </div>
            
        </div>
    )
}

export default AdminHome