import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting registration for user:', formData.name);
            const response = await axios.post('http://localhost:3001/api/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            console.log('Registration response:', response.data);

            if (response.data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                // Wait for 1 second to show the success message
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 1000);
            } else {
                setError(response.data.error || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-500 to-white p-4">
            <div className='bg-white p-6 rounded-2xl w-full max-w-md shadow-lg'>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Signup</h2>
                        <h2 className="text-xl text-gray-600">to get started</h2>
                    </div>
                    <div>
                        <img src="incon.png" alt="Signup Icon" className="w-40 h-40 object-contain" />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border rounded-lg"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border rounded-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3 border rounded-lg"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            required
                        />
                        <p className="ml-2">I agree to the Terms and Conditions</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white rounded-lg ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-amber-500 hover:bg-amber-600'
                        }`}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-6">
                    Already Registered?{' '}
                    <Link to="/login" className="font-bold text-amber-500 hover:text-amber-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;