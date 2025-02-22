import axios from 'axios'
const baseUrl = 'http://localhost:8080'

export const login = async (credentials) => {
    const response = await axios.post(baseUrl+'/auth/login',credentials);
    console.log('response.data', response.data);
    console.log('response', response);
    return response.data;
}

export const register = async (userInfo) => {
    const response = await axios.post(baseUrl+'/api/users', userInfo);
    return response.data;
}

// export default { login, register }