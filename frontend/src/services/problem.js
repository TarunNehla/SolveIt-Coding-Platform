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


