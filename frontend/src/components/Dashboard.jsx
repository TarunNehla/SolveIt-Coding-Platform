import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { allProblems } from '../services/problem';


function Dashboard() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(()=> {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, [])

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await allProblems();
        console.log('all problems', response )
        setProblems(response || []);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  }

  const handleRowClick = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <div>
      <div className="navbar bg-base-100 w-full justify-between ">
        <a className="btn btn-ghost text-xl">Solve It</a>
        <div className="navbar-end m-3">
          <button className='btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <h1>Welcome {userInfo?.name}</h1>
      <h2>Email : {userInfo?.email}</h2>
      {/* <img src={userInfo?.image}/> */}
      <button onClick={handleLogout}>Logout</button>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Solved By</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr className='hover' key={problem.id} onClick={() => navigate(`/problem/${problem.id}`)}>
                <th>{index + 1}</th>
                <td>{problem.name}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.user.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard