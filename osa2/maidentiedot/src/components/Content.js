import React, { useState } from 'react'
import Country from './Country'

const Content = ({ search, countries }) => {
  
  // Mikä maa on valittu ja näytetäänkö se.
  const [country, setCountry] = useState(null)
  const [show, setShow] = useState(false)

  // Jos klikataan painiketta, asetetaan maa ja näyttö true.
  const handleClick = (country) => () => {
    setShow(true)
    setCountry(country)
  }

  // Näytettävät maat yleisesti.
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )

  // Näytettävät maat riveiksi.
  const rows = () => (
    countriesToShow.map(country =>
      <div key={country.name}>
        {country.name}&nbsp;
        <button onClick={handleClick(country)}>show</button>
      </div>
    )
  )

  // Jos maita on yli 10, näytetään tämä teksti.
  // Jos on tasan yksi, näytetään sen maan tiedot.
  // Jos on lista eikä painettu painiketta, näytetään lista.
  // Jos on painettu painiketta, näytetään haluttu maa listan alapuolella.
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