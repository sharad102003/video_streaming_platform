import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check if tokens exist
    const checkTokens = () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!accessToken || !refreshToken) {
        // If tokens are missing, automatically navigate to login
        navigate('/login');
      }
    };

    // Call checkTokens on component mount
    checkTokens();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      console.log('Cookies before logout request:', document.cookie);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/logout`, {}, {
        withCredentials: true // Ensure cookies are included in the request
      });

      // Clear tokens from localStorage or wherever they are stored
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Navigate to the login page after logout
      navigate('/login');
      window.location.reload();


    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure, if needed
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Logout</h2>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

