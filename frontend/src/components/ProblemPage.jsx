import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { singleProblem, submission, run } from '../services/problem';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProblemPage = () => {
    const navigate = useNavigate();
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('cpp');
    const [solution, setSolution] = useState('');
    const [outputMessage, setOutputMessage] = useState('----Output will be here-----');
    const [customInput, setCustomInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const data = await singleProblem(problemId);
                setProblem(data);
                setCustomInput(data.sampleInput);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };
        fetchProblem();
    }, [problemId]);

    if (!problem) {
        return <div className='flex justify-center items-center w-full h-full'>
            <>
                <span className="loading loading-spinner loading-xs"></span>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="loading loading-spinner loading-md"></span>
                <span className="loading loading-spinner loading-lg"></span>
            </>
        </div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
      }

      const handleSubmit = async () => {
        try {
            console.log('clicked');
            setIsLoading(true);
            const response = await submission(problemId, { code: solution, language: selectedLanguage });
            const data = response.data;
            console.log('data', data);
            if (data.success) {
                setOutputMessage('Correct Answer, Solution Accepted ✅✅ ');
            } else {
                if (data.errorType === 'compilation') {
                    setOutputMessage('Compilation Error: ' + data.output.message);
                } else if (data.errorType === 'runtime') {
                    setOutputMessage('Runtime Error');
                } else if (data.errorType === 'output') {
                    setOutputMessage('Wrong Answer ❌ : Try Again');
                } else {
                    setOutputMessage('Error: ' + data.message);
                }
            }
        } catch (error) {
            console.error('Error submitting solution:', error);
            setOutputMessage('Error submitting solution: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleRun = async () => {
        try {
            console.log('clicked');
            setIsLoading(true);
            setOutputMessage('<span className="loading loading-spinner loading-lg"></span>');
            const response = await run(problemId, {input: customInput, code: solution, language: selectedLanguage });
            const data = response.data;
            console.log('data', data);
            if (data.success) {
                setOutputMessage(data.output);
            } else {
                if (data.errorType === 'compilation') {
                    setOutputMessage('Compilation Error: ' + data.output);
                } else if (data.errorType === 'runtime') {
                    setOutputMessage('Runtime Error');
                } else {
                    setOutputMessage('Error: ' + data.message);
                }
            }
        } catch (error) {
            console.error('Error submitting solution:', error);
            setOutputMessage('Error submitting solution: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div>
        <Navbar/>
    <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="md:w-1/2">
        <h1 className="text-2xl font-bold text-center">{problem.name}</h1>
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
                    <li><a onClick={() => setSelectedLanguage('cpp')}>cpp</a></li>
                    <li><a onClick={() => setSelectedLanguage('python')}>python</a></li>
                </ul>
            </div>
            <textarea
                placeholder="Write your solution here..."
                className="mt-2 textarea textarea-bordered textarea-lg w-full h-96 bg-slate-600 text-white"
                value = {solution}
                onChange={(e)=> setSolution(e.target.value)}
            />
            
            <div className="flex mt-2 w-full mb-5">
                <button className="btn w-1/2 mr-1 bg-slate-400 text-white" onClick={handleRun}>Run</button>
                <button className="btn btn-neutral w-1/2" onClick={handleSubmit}>Submit</button>
            </div>
            <h3 className='ml-4 font-bold'>Custom Input</h3>
            <textarea
                placeholder="Custom Input"
                className="ml-3 mt-2 textarea textarea-bordered textarea-lg w-1/2 h-40"
                value = {customInput}
                onChange={(e)=> setCustomInput(e.target.value)}
            />

            <div className="mt-4 p-4 border border-gray-300 rounded" style={{ maxHeight: '200px', overflow: 'auto' }}>
                <h2 className="text-xl font-bold">Output</h2>
                <pre className="mt-2">
                    {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                <span className="loading loading-spinner loading-sm"></span>
                                <span className="loading loading-spinner loading-md"></span>
                                <span className="loading loading-spinner loading-lg"></span>
                            </>
                        ) : (
                            outputMessage
                        )}
                    </pre>
            </div>
        </div>
    </div>

    </div>
  )
}

export default ProblemPage