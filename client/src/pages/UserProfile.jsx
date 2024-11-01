import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/users/', {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error.response || error);
            }
        };

        fetchUser();
    }, []);

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
        <div className="flex items-column justify-center h-screen">
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <div className="flex items-center justify-center h-screen">
            <button 
                onClick={handleLogout} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
        </div>
    );
};

export default UserProfile; 