import React, { useState } from 'react'
import Country from './Country'

const Content = ({ search, countries }) => {

  const [show, setShow] = useState(false)
  const [country, setCountry] = useState(null)

  const handleClick = (country) => () => {
    setShow(true)
    setCountry(country)
  }

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )

  const rows = () => (
    countriesToShow.map(country =>
      <div key={country.name}>
        {country.name}
        <button onClick={handleClick(country)}>show</button>
      </div>
    )
  )

  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]} />
    )
  }
  else {
    if (!show) {
      return (
        rows()
      )
    }
    else {
      return (
        <div>
          {rows()}
          <Country country={country} />
        </div>
      )
    }
  }
}

export default Content