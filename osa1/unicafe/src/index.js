import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ heading }) => <h1>{heading}</h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Statistic = ({ type, value }) => <p>{type} {value}</p>

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
            <Statistic type="good" value={good} />
            <Statistic type="neutral" value={neutral} />
            <Statistic type="bad" value={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)