import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = "7bd9a2f6ec3eeb2aec479e9a748a15a8"

const Weather = ({ country }) => {

  const [weather, setWeather] = useState([])

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  // Kun pääkaupunki vaihtuu, päivitetään.
  useEffect(hook, [country])

  if (weather.current) {

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
  }
  else {
    return <div></div>
  }
}

export default Weather