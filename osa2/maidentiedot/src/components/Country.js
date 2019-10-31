import React from 'react'
import ListItem from './ListItem'

const Country = ({ country }) => {

  const languages = country.languages.map(language =>
    <ListItem key={language.iso639_2} text={language.name} />
  )

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital} <br />
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {languages}
      </ul>
      <img alt="Flag" src={country.flag} width="200px" />
    </div>
  )
}

export default Country