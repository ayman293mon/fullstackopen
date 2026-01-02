import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY;
const getweather = (capital) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    .then(response => response.data);
    return request; 
}
export default getweather;