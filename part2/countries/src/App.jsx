import { useState, useEffect } from 'react'
import React from 'react'
import Content from './components/Content.jsx'
import data from './services/data.js';
function App() {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const api_key = import.meta.env.VITE_WEATHER_KEY;
  console.log(api_key)
  const handleOnChange = (event) => {
    console.log(event.target.value);
    setCountryName(event.target.value);
  }
  useEffect(() => {
    const response = data.getAll().then(response => {
      const allCountries = Object.values(response);
      setCountries(allCountries);
    });
  }, []);

  return (
    <div>
      <p>
        find countries <input onChange={handleOnChange} value={countryName} />
      </p>
      <Content name={countryName} setCountryName={setCountryName} countries={countries} />
    </div>
  )
}
export default App
