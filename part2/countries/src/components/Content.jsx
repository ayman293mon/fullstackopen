import React from 'react';
import { useState } from 'react'
import ShowCountry from './ShowCountry';
const Content = ({ name, setCountryName, countries }) => {
    const filterCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(name.toLowerCase()));
    if (filterCountries.length === 0) {
        return <p>No matches found</p>;
    } else if (filterCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (filterCountries.length === 1) {
        return (
            <ShowCountry country={filterCountries[0]} />
        );
    } else {
        const handleShowButton = (country) => {
            setCountryName(country.name.common);
        };
        return (
            <div>
                <ul>
                    {
                        filterCountries.map(country =>
                            <li key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => handleShowButton(country)}>Show</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
};
export default Content;