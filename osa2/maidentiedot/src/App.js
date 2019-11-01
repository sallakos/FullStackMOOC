import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import Result from './components/Result'

// const API_KEY = "7bd9a2f6ec3eeb2aec479e9a748a15a8"

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  // const [weather, setWeather] = useState([])
  
  // const weatherHook = ({ city }) => {
  //   axios
  //     .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`)
  //     .then(response => {
  //       setWeather(response.data)
  //     })
  // }

  // // Kun pääkaupunki vaihtuu, päivitetään.
  // useEffect(weatherHook, [country])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <Result search={search} countries={countries} />
    </>
  );
}

export default App;
