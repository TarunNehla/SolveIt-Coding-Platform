import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(()=> {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  }

  return (
    <div>
      <h1>Welcome {userInfo?.name}</h1>
      <h2>Email : {userInfo?.email}</h2>
      {/* <img src={userInfo?.image}/> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard