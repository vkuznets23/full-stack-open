import axios from 'axios'
import { useEffect, useState } from 'react'

const Country = ({ country, setSelectedCountry }) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const api = import.meta.env.VITE_WEATHER_API_KEY
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api}&units=metric`
      try {
        const { data } = await axios(weatherUrl)
        setWeather(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [country])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <h1>{country.name.common}</h1>
        {setSelectedCountry && (
          <button
            style={{ height: 40 }}
            onClick={() => setSelectedCountry(null)}
          >
            back
          </button>
        )}
      </div>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => {
          return <li key={index}>{language}</li>
        })}
      </ul>
      <img src={country.flags.png} />

      <h1>Weather in {country.name.common}</h1>
      {weather && weather.main ? (
        <div>
          <p>Temperature {weather.main.temp} °C</p>
          <p>Feels like {weather.main.feels_like} °C</p>
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  )
}

export default Country
