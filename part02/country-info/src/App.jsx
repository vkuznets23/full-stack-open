import React from "react";
import { useState, useEffect } from "react"
import contriesService from './service.js'
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([]) // its array of cards woth data
  const [selectedCountry, setSelectedCountry] = useState(null); // State to track the selected country
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log('Effect');
    contriesService
    .getAll()
    .then(response => {
      const filteredCountries = response.data.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
      setCountries(filteredCountries);
      setSelectedCountry(null);
      setWeather(null);

      if (filteredCountries.length === 1) {
        fetchWeatherData(filteredCountries[0].capital[0]); // Fetch weather for that country
      }
    })
    .catch (error => {
      console.log("It doesn't work", error);
    })
  }, [search]);

  const handleShowCountry = (country) => {
    setSelectedCountry(country); // Update state to show selected country's details
    if (country.capital && country.capital[0]) {
      fetchWeatherData(country.capital[0]);
    } else {
      console.log("No capital found for this country.");
      setWeather(null);
    }
  };

  const fetchWeatherData = (capital) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
    axios
      .get(url)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log("Weather data fetch failed", error);
      });
  }
  

  const CountryDetails = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital[0]}</p>
        <p><strong>Area:</strong> {country.area} km²</p>
        <p><strong>Languages:</strong></p>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

        {weather && (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  };

  const CountryList = ( { countries }) => {
    if (countries.length > 10 && search !== "")
      return <p>Too many matches, please be more specific.</p>
    else if (countries.length > 1 && countries.length < 10)
      return (
        <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            <div>
            {country.name.common}
            <button onClick={() => handleShowCountry(country)}>show</button>
            </div>
            </li>
        ))}
      </ul>
    );
    if (countries.length === 1)
      return <CountryDetails country={countries[0]} weather={weather}/>;
    return null;
  }

  return (
      <div>
        <h1>Country Information</h1>
        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter country name"
        />
        {selectedCountry ? (<CountryDetails country={selectedCountry} />
        ) : (
          <CountryList countries={countries}/>
        )}
      </div>

  )
}

export default App;
