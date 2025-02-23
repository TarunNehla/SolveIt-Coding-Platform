import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { singleProblem } from '../services/problem';
import { useNavigate } from 'react-router-dom';

const ProblemPage = () => {
    const navigate = useNavigate();
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
    const [solution, setSolution] = useState('');

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const data = await singleProblem(problemId);
                setProblem(data);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };
        fetchProblem();
    }, [problemId]);

    if (!problem) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
      }

    const handleSubmit = () => {
        
    }

  return (
    <div>
        <div className="navbar bg-base-100 w-full justify-between ">
        <a className="btn btn-ghost text-xl">Solve It</a>
        <div className="navbar-end m-3">
          <button className='btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="md:w-1/2">
        <h1 className="text-2xl font-bold">{problem.name}</h1>
            <div className="mt-2 p-4 border border-gray-300 rounded">
            <p style={{ whiteSpace: 'pre-wrap' }}>{problem.discription}</p>
            </div>
            <div className="mt-2 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold">Sample Input</h2>
            <pre className="mt-2">{problem.sampleInput}</pre>
            </div>
            <div className="mt-2 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold">Sample Output</h2>
            <pre className="mt-2">{problem.sampleOutput}</pre>
            </div>
        </div>
        <div className="md:w-1/2">
            <div className="dropdown w-full">
                <div tabIndex={0} role="button" className="btn m-1 w-full">{selectedLanguage}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                    <li><a onClick={() => setSelectedLanguage('C++')}>C++</a></li>
                    <li><a onClick={() => setSelectedLanguage('Python')}>Python</a></li>
                </ul>
            </div>
            <textarea
                placeholder="Write your solution here..."
                className="mt-2 textarea textarea-bordered textarea-lg w-full h-96"
                value = {solution}
                onChange={(e)=> setSolution(e.target.value)}
            />
            <button className="btn btn-neutral mt-2 w-full" onClick={handleSubmit}>Submit</button>
            <div className="mt-4 p-4 border border-gray-300 rounded">
                <h2 className="text-xl font-bold">Output</h2>
                <pre className="mt-2">Output will be displayed here...</pre>
            </div>
        </div>
    </div>

    </div>
  )
}

export default ProblemPage