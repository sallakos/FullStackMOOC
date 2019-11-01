import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import Content from './components/Content'

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

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <Content search={search} countries={countries} />
    </>
  );
}

export default App;
