import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSide from '../components/AdminSide'
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