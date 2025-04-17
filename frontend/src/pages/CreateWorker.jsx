import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'

const CreateWorker = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: 'male',
        category: 'Old Care',
        language: 'english',
        phone: '',
        email: '',
        experience: '',
        perDayCharge: '',
        age: '',
        location: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const workerData = {
                name: `${formData.firstName} ${formData.lastName}`,
                gender: formData.gender,
                category: formData.category,
                language: formData.language,
                phone: formData.phone,
                email: formData.email,
                experience: parseInt(formData.experience),
                perDayCharge: parseInt(formData.perDayCharge),
                age: parseInt(formData.age),
                location: formData.location,
                rating: 0,
                reviews: 0
            };

            console.log('Sending worker data:', workerData); // Debug log

            const response = await axios.post('http://localhost:3001/api/workers', workerData);
            console.log('Worker created:', response.data);
            navigate('/home');
        } catch (error) {
            console.error('Error creating worker:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(`Error: ${error.response.data.message || 'Failed to create worker'}`);
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response from server. Please check if the backend is running.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div class='bg-amber-500 p-2'>
            <Header />
            <div className='w-full h-screen p-4'>
                <div className='w-full h-screen bg-indigo-100 p-4 rounded'>
                    <h1 className='text-3xl font-semibold'>Make your Profile !</h1>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex p-2 rounded-lg pl-8">
                            <div className="w-1/2 pt-2">
                                <img src="user (2).png" className="h-30 w-30" alt="" />
                            </div>
                            <div className="w-1/2 flex justify-end items-center">
                                <button 
                                    type="submit"
                                    className='bg-orange-400 rounded w-20 p-2 font-semibold text-white cursor-pointer hover:bg-orange-500 transition-all duration-300'
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className="flex pl-8 pr-8 gap-3 mt-5">
                            <div className="w-1/2 pt-2">
                                <p>First Name</p>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Your firstname' 
                                    required
                                />
                            </div>
                            <div className="w-1/2 pt-2">
                                <p>Last Name</p>
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Your lastname' 
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex pl-8 pr-8 gap-3 mt-3">
                            <div className="w-1/2 pt-2">
                                <p>Age</p>
                                <input 
                                    type="number" 
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Your age' 
                                    required
                                />
                            </div>
                            <div className="w-1/2 pt-2">
                                <p>Location</p>
                                <input 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Your location' 
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex pl-8 pr-8 gap-3 mt-3">
                            <div className="w-1/2 pt-2">
                                <p>Gender</p>
                                <select 
                                    name="gender" 
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="w-1/2 pt-2">
                                <p>Categories</p>
                                <select 
                                    name="category" 
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    required
                                >
                                    <option value="Old Care">Old Care</option>
                                    <option value="House Cleaning">House Cleaning</option>
                                    <option value="Cook">Cook</option>
                                    <option value="Baby Sitting">Baby Sitting</option>
                                    <option value="Home Tution">Home Tution</option>
                                    <option value="Physiotherapist">Physiotherapist</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex pl-8 pr-8 gap-3 mt-3">
                            <div className="w-1/2 pt-2">
                                <p>Language</p>
                                <select 
                                    name="language" 
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    required
                                >
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                    <option value="gujarati">Gujarati</option>
                                </select>
                            </div>
                            <div className="w-1/2 pt-2">
                                <p>Phone no.</p>
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Enter your phone number' 
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex pl-8 pr-8 gap-3 mt-3">
                            <div className="w-1/2 pt-2">
                                <p>Email</p>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Enter your Email' 
                                    required
                                />
                            </div>
                            <div className="w-1/2 pt-2">
                                <p>Experience (in years)</p>
                                <input 
                                    type="number" 
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Enter your experience in years' 
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="flex pl-8 pr-8 gap-3 mt-3">
                            <div className="w-1/2 pt-2">
                                <p>Per Day Charge (INR)</p>
                                <input 
                                    type="number" 
                                    name="perDayCharge"
                                    value={formData.perDayCharge}
                                    onChange={handleChange}
                                    className="w-full h-8 bg-white rounded p-1 pl-3 text-sm" 
                                    placeholder='Enter your Per day Charge' 
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateWorker