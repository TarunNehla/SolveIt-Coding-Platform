import { useState, useEffect } from 'react';
import { allUsers } from '../services/user';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUsers();
        // Sort users based on the number of problems solved in descending order
        const sortedUsers = response.sort((a, b) => b.problems.length - a.problems.length);
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold text-center my-4">Leaderboard</h1>
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
                <th>Name</th>
                <th>Problems Solved</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr className="hover" key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.problems.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;