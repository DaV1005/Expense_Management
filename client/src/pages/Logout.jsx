import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            console.log('Attempting to log out...');
            const response = await axios.post('http://localhost:5555/api/users/logout', {}, {
                withCredentials: true,
            });
            console.log('Logout successful:', response);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response || error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <button 
                onClick={handleLogout} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout; 