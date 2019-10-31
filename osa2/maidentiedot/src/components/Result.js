import React from 'react'
import Country from './Country'
import Row from './Row'

const Result = ({ search, countries }) => {

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleClick = (country) => () => (
    console.log(country.name)
    //<Country country={country} />
  )

  const list = () => {

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
      return (
        countriesToShow
          .map(country => <Row key={country.cioc}
                               text={country.name}
                               handleClick={handleClick(country)} />)
      )
    }
  }

  return (
    <div>{list()}</div>
  )

}

export default Result