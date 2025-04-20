import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
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
        if (!formData.name || !formData.password) {
            setError('Username and password are required');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting login for user:', formData.name);
            const response = await axios.post('http://localhost:3001/api/users/login', {
                name: formData.name,
                password: formData.password
            });

            console.log('Login response:', response.data);

            if (response.data.success) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setSuccess('Login successful! Redirecting to home...');
                console.log('Login successful, redirecting to home');
                
                // Wait for 1 second to show the success message
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, 1000);
            } else {
                setError(response.data.error || 'Login failed');
                console.error('Login failed:', response.data.error);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-500 to-white p-4">
            <div className='bg-white p-6 rounded-2xl w-full max-w-md shadow-lg'>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Login</h2>
                        <h2 className="text-xl text-gray-600">Welcome back</h2>
                    </div>
                    <div>
                        <img src="incon.png" alt="Login Icon" className="w-40 h-40 object-contain" />
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
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white rounded-lg ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-amber-500 hover:bg-amber-600'
                        }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-amber-500 hover:text-amber-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;