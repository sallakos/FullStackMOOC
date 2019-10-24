import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ heading }) => <h1>{heading}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

// Statistic palautetaan taulukon rivinä. Ei ehkä tyylikkäin ratkaisu, koska
// nyt sitä ei voi käyttää taulukon ulkopuolella. Toimii kuitenkin tarpeisiin.
const Statistic = ({ type, value }) => <tr><td>{type}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {

  // Lasketaan yhteen
  const all = good + neutral + bad
  // Hyvä = 1, neutraali = 0, huono = -1
  const averageCount = (good * 1 + bad * (-1)) / all

  if (all === 0) {
    return ("No feedback given")
  } else {
    return (
      <table>
        <tbody>
          <Statistic type="good" value={good} />
          <Statistic type="neutral" value={neutral} />
          <Statistic type="bad" value={bad} />
          <Statistic type="all" value={all} />
          <Statistic type="average" value={averageCount} />
          <Statistic type="positive" value={(good / all) * 100 + " %"} />
        </tbody>
      </table>
    )
  }

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading heading="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Heading heading="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)