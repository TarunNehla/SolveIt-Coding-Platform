import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-info'));
        setUserInfo(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 w-full justify-between">
            <a className="btn btn-ghost text-xl" onClick={() => navigate('/dashboard')}>Solve It</a>
            <div className="navbar-end m-3">
                <button className='btn mr-5' onClick={()=> navigate('/leaderboard')}>LeaderBoard</button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img 
                                alt="User Avatar" 
                                src='https://cdn-icons-png.flaticon.com/512/847/847969.png'
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between" onClick={() => navigate(`/profile/${userInfo?.id}`)}>
                                Profile
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
                {/* <button className="btn" onClick={handleLogout}>Logout</button> */}
            </div>
        </div>
    );
};

export default Navbar;