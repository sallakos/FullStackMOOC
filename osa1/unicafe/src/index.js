import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ heading }) => <h1>{heading}</h1>

const Button = ({ text }) => <button>{text}</button>

const Statistic = ({ type, value }) => <p>{type} {value}</p>

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Heading heading="give feedback" />
            <Button text="good" />
            <Button text="neutral" />
            <Button text="bad" />
            <Heading heading="statistics" />
            <Statistic type="good" value={0}/>
            <Statistic type="neutral" value={0}/>
            <Statistic type="bad" value={0}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)