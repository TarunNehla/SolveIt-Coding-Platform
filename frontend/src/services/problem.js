import axios from 'axios'
const baseUrl = 'http://localhost:8080'

export const allProblems = async () => {
    const response = await axios.get(baseUrl+'/api/problems');
    console.log('response.data', response.data);
    console.log('response', response);
    return response.data;
}

export const singleProblem = async (id) => {
    const response = await axios.get(`${baseUrl}/api/problems/${id}`);
    console.log('response.data', response.data);
    console.log('response', response);
    return response.data;
}

export const submission = async (id, solution) => {
    const user = JSON.parse(localStorage.getItem('user-info'));
    console.log('token', user.token);
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(`${baseUrl}/api/problems/${id}`, solution, config);
    console.log('response.data', response.data);
    console.log('response', response);
    return response;
};

export const run = async (id, solution) => {
    const user = JSON.parse(localStorage.getItem('user-info'));
    console.log('token', user.token);
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(`${baseUrl}/api/problems/run/${id}`, solution, config);
    console.log('response.data', response.data);
    console.log('response', response);
    return response;
}


