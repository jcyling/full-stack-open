import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

const WEATHERKEY = process.env.REACT_APP_WEATHERKEY;

const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState([])

  // Weather API fetch
  const fetchWeatherHook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHERKEY}`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(fetchWeatherHook, []);

  if (weather.main) {
    const icon = weather.weather[0].icon;
    return (
      <div>
        <h3>Current Weather</h3>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
        <p>Temperature: {Math.floor(weather.main.temp / 10)}°C</p>
      </div>
    )
  }
  else {
    return
  }
}

const ListResultDisplay = ({ countriesDisplay }) => {
  const [showCountryFromList, setCountryFromList] = useState('')

  if (showCountryFromList) {
    return (
      <ResultDisplay country={showCountryFromList} />
    )
  }
  else {
    return (
      countriesDisplay.map(country =>
        <>
          <p key={country.name.common}>{country.name.common}</p>
          <button onClick={() => setCountryFromList(country)}>Show</button>
        </>
      )
    )
  }
}

const ResultDisplay = ({ country }) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  return (
    <>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={country.name} />
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {
          Object.values(country.languages).map(language => {
            return <li key={language}>{language}</li>
          })
        }
      </ul>
      <Weather lat={lat} lon={lon} />
    </>
  )
}

const ResultHandler = ({ result, countriesDisplay }) => {

  if (result === "reject") {
    return (
      <p>Too many matches.</p>
    )
  }
  else if (result === "list") {
    return (
      <ListResultDisplay countriesDisplay={countriesDisplay} />
    )
  }
  else if (countriesDisplay.length === 1) {
    return (
      <ResultDisplay country={countriesDisplay[0]} />
    )
  }
  else {
    return
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countriesDisplay, setDisplay] = useState([])
  const [result, setResult] = useState('')

  // Countries API fetch
  const fetchCountriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(fetchCountriesHook, []);

  const handleSearchInput = (event) => {
    if (event.target.value.length > 0) {
      let country = event.target.value
      setSearch(country)
      searchFunc();
    }
    else {
      // At zero length input, reset states
      setSearch('');
      setResult('');
      setDisplay([]);
    }
  }

  // Determine search specificity state
  const searchFunc = () => {
    const list = countries
      .filter(country => {
        let data = country.name.common.toLowerCase();
        let searchWord = search.toLowerCase();
        if (data.includes(searchWord)) {
          return country
        }
      })

    if (list.length > 10) {
      setResult("reject");
    }
    else if (list.length <= 10 && list.length > 1) {
      setResult("list");
      setDisplay(list)
    }
    else {
      setResult("single");
      setDisplay(list)
    }
  }

  return (
    <div>
      <h1>Search World</h1>
      <input value={search} onChange={handleSearchInput} />
      <div>
        <ResultHandler result={result} countriesDisplay={countriesDisplay} />
      </div>
    </div>
  )
}

export default App;
