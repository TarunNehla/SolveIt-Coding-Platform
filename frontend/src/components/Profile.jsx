import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <Navbar/>
        <div className="flex flex-col items-center p-4">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                alt="User Avatar"
                src='https://cdn-icons-png.flaticon.com/512/847/847969.png'
                className="w-full h-full object-cover"
                />
            </div>
            <h1 className="text-2xl font-bold mb-2">{userInfo.name}</h1>
            <p className="text-lg mb-2">Email: {userInfo.email}</p>
            <p className="text-lg">Problems Solved: {userInfo.problems.length}</p>
        </div>
    </>
    
  );
};

export default Profile;