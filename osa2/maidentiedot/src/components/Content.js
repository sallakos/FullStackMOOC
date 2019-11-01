import React, { useState } from 'react'
import Country from './Country'

const Content = ({ countriesToShow }) => {

  const [show, setShow] = useState(false)
  const [country, setCountry] = useState(null)

  const handleClick = (country) => () => {
    setShow(true)
    setCountry(country)
  }

  const rows = () => (
    countriesToShow.map(country =>
      <div key={country.name}>
        {country.name}
        <button onClick={handleClick(country)}>show</button>
      </div>
    )
  )

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

export default Content