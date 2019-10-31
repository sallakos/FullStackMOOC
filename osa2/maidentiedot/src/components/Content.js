import React, { useState } from 'react'
import Row from './Row'
import Country from './Country'

const Content = ({ countriesToShow }) => {

  const [show, setShow] = useState(false)
  const [country, setCountry] = useState(countriesToShow[0])

  const handleClick = (country) => () => {
    setShow(true)
    setCountry(country)
  }

  const rows = () => (
    countriesToShow.map(country =>
      <Row key={country.name}
           text={country.name}
           handleClick={handleClick(country)} />
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