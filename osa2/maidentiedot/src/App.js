import React, { useState } from 'react';
import Search from './components/Search'
import Result from './components/Result'

const App = () => {

  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <Result />
    </>
  );
}

export default App;
