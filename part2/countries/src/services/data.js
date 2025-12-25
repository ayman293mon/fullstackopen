import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const getAll = () => {
    const response = axios.get(baseUrl).then(response => response.data);
    console.log('from data', response);
    return response;
};
export default { getAll};