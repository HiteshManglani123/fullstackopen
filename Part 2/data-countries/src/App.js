import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({onChange, value}) => <><input onChange={onChange} value={value}></input></>

const SearchForm = ({onCountrySearchChange, countrySearchValue}) => {
  return (
    <div>
        find countries: <Input onChange={onCountrySearchChange} value={countrySearchValue} />
    </div>
  )
}


const Country = ({country, handleCountryShow }) => {
  
  return (
    <div>
    {country.name}
    <button onClick={() => handleCountryShow(country)}>show</button>
    </div>
  )
}

const ShowSingleCountry = ({ weather, getWeather, country }) => {
  let lang = country.languages;
  getWeather(country.capital)
  // handlWeather(country.capital)
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {lang.map((language, index) => <li key={index}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="200px" height="200px" />
      <h1>{weather.weather_description}</h1>
    </>
  )
}



const Countries = ({ countries, getWeather, weather, handleCountryShow }) => {
  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>     
      </>
    )
  } else if (countries.length === 1) {
        return (
          <div>
            <ShowSingleCountry getWeather={getWeather} weather={weather} country={countries[0]} />
          </div>
        )

  } else {
    return (
      <>
          {countries.map(country => <Country handleCountryShow={handleCountryShow} country={country} key={country.numericCode}/>)}
      </>
    )}
}

function App() {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const GetWeather = (capital) => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query="${capital}"`)
      .then(response => {
        setWeather(response.data)
      })
  }

  const OnCountrySearchChange = (event) => {
    setCountrySearch(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.includes(event.target.value))
  )}

  const handleCountryShow = (country) => {
      setFilteredCountries(countries.filter(orignalCountry => country.numericCode === orignalCountry.numericCode))
  }

  return (
    <div>
     <SearchForm onCountrySearchChange={OnCountrySearchChange} countrySearchValue={countrySearch}/>
     <Countries getWeather={GetWeather} weather={weather} countries={filteredCountries} handleCountryShow={handleCountryShow}/>
    </div>
  );
}

export default App;
