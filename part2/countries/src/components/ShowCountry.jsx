import React from "react";
import { useState, useEffect } from "react";
import getWeather from '../services/weather.js';
const ShowCountry = ({ country }) => {
    const [weather, setWeather] = useState({
        main: { temp: '' },
        weather: [{ icon: '' }],
        wind: { speed: '' }
    });
    useEffect(() => {
        getWeather(country.capital).then(data => setWeather(data));
    }, [country.capital]);
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <div>
                <h2>Languages:</h2>
                <ul>
                    {country.languages &&
                        Object.values(country.languages).map((language) => (
                            <li key={language}>{language}</li>
                        ))}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.flags.alt} />
            <div>
                <h2>Whether in {country.capital}</h2>
                <p>Temperature {weather.main.temp} Celcius</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        </div>
    )
}
export default ShowCountry;