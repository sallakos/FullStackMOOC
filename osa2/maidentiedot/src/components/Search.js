import React from 'react'

const Search = ({ search, handleSearch }) => (
  <div>
    find countries&nbsp;
    <input value={search} onChange={handleSearch} />
  </div>
)

export default Search