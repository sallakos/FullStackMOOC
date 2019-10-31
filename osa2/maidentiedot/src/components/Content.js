import React from 'react'
import Row from './Row'

const Content = ({ countriesToShow }) => {

  const handleClick = (country) => () => (
    console.log(country.name)
    //<Country country={country} />
  )

  const rows = () => (
    countriesToShow.map(country =>
      <Row key={country.cioc}
           text={country.name}
           handleClick={handleClick(country)} />
    )
  )

  return (
    rows()
  )

}

export default Content