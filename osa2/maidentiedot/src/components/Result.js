import React from 'react'
import Country from './Country'
import Content from './Content'

const Result = ({ search, countries }) => {

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
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
        <Content countriesToShow={countriesToShow} />
      )
    }
  }

  return (
    <div>{list()}</div>
  )

}

export default Result