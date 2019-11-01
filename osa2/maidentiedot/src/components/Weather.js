import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const Weather = ({ country }) => {

  // Tila säälle.
  const [weather, setWeather] = useState([])

  // Haetaan halutun maan säätiedot. Tämä on vähän hidas prosessi.
  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  // Kun pääkaupunki vaihtuu, päivitetään.
  useEffect(hook, [country])

  // Jos säätiedot on löydetty, palautetaan ne. Muuten tieto siitä, että niitä haetaan.
  if (weather.current) {

    // Sääkuvakkeet. Oletin, että näitä voisi olla useampi, mutta ilmeisesti on vain yksi.
    const weatherIcons = weather.current.weather_icons.map(icon => {
      const index = icon.indexOf("wsymbol_")
      const key = icon.substring(index + 8, index + 12)
      return (
        <img key={key} alt="weather icon" src={icon} />
      )
    })

    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p><b>temperature: </b>{weather.current.temperature} Celsius</p>
        {weatherIcons}
        <p><b>wind: </b>{weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
      </div>
    )

  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Loading weather data.</p></div>
    )
  }
}

export default Weather