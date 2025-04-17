import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const EditWorker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { worker } = location.state || {};

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (worker) {
      // Split the name into first and last name
      const [firstName, ...lastNameParts] = worker.name.split(' ');
      const lastName = lastNameParts.join(' ');

      setFormData({
        firstName,
        lastName,
        gender: worker.gender || 'male',
        category: worker.category || 'Old Care',
        language: worker.language || 'english',
        phone: worker.phone || '',
        email: worker.email || '',
        experience: worker.experience?.toString() || '',
        perDayCharge: worker.perDayCharge?.toString() || '',
        age: worker.age?.toString() || '',
        location: worker.location || ''
      });
    }
  }, [worker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

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
        location: formData.location
      };

      const response = await axios.put(`http://localhost:3001/api/workers/${worker._id}`, workerData);
      
      if (response.status === 200) {
        setSuccess(true);
        // Wait for 1.5 seconds before navigating back
        setTimeout(() => {
          navigate('/workers');
        }, 1500);
      } else {
        throw new Error('Failed to update worker');
      }
    } catch (error) {
      console.error('Error updating worker:', error);
      if (error.response) {
        setError(`Error: ${error.response.data.message || 'Failed to update worker'}`);
      } else if (error.request) {
        setError('No response from server. Please check if the backend is running.');
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!worker) {
    return (
      <div className="bg-gradient-to-b from-amber-500 to-white min-h-screen p-2">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Worker not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-amber-500 p-2'>
      <Header />
      <div className='w-full h-screen p-4'>
        <div className='w-full h-screen bg-indigo-100 p-4 rounded'>
          <h1 className='text-3xl font-semibold'>Edit Worker Profile</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">Worker updated successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6 pr-8">
              <button
                type="button"
                onClick={() => navigate('/workers')}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWorker; 