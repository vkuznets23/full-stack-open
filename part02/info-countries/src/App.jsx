import axios from 'axios'
import Country from './components/Country'
import { useEffect, useState } from 'react'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(`${baseUrl}/api/all`)
        setCountries(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
  )

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country)
  }

  const renderCountry = () => {
    if (selectedCountry) {
      return (
        <Country
          country={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )
    }
    if (filteredCountries.length > 10) return <p> Too many options</p>

    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    }
    return filteredCountries.map((country) => (
      <div
        key={country.cca2}
        style={{ display: 'flex', gap: 20, alignItems: 'center' }}
      >
        <p>{country.name.common}</p>
        <button onClick={() => handleSelectedCountry(country)}>more</button>
      </div>
    ))
  }

  return (
    <div>
      <input
        placeholder="search country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {renderCountry()}
    </div>
  )
}

export default App
