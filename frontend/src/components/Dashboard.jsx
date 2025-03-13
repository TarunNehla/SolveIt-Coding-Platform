import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProblems } from '../services/problem';
import Navbar from './Navbar';

function Dashboard() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    console.log('userData', userData);
    setUserInfo(userData);
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await allProblems();
        console.log('all problems', response);
        setProblems(response || []);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);


  return (
    <div>
      <Navbar />
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <>
              <span className="loading loading-spinner loading-xs"></span>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
              <span className="loading loading-spinner loading-lg"></span>
            </>
          </div>
        ) : (
          <table className="table">
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
                <tr 
                  className={`hover ${userInfo?.problems?.includes(problem.id) ? 'bg-green-100' : ''}`}
                  key={problem.id} 
                  onClick={() => navigate(`/problem/${problem.id}`)}
                >
                  <th>{index + 1}</th>
                  <td>{problem.name}</td>
                  <td>{problem.difficulty}</td>
                  <td>{problem.user.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;