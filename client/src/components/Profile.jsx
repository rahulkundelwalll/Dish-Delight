import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Spinner from './Spinner';
import SERVER_URI from '../config';

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const id = decodedToken.id;

  const config = {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/api/auth/profile/${id}`,config);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  if (user) {
    return (
      <div className="fixed inset-[30%]  z-30 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
        <div className="relative  bg-white rounded-md shadow-lg p-4">
          <div>
            <div>
              <p className="text-sm text-gray-700">Name: {user.data[0].name}</p>
              <p className="text-sm text-gray-700">Email: {user.data[0].email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed inset-40 flex items-center justify-center">
        <div className="relative w-1/5 h-1/4  p-4">
          <div>
            <div>
               <Spinner />;
            </div>
          </div>
        </div>
      </div>
    );
  
  }
};

export default Profile;
