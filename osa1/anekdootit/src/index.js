import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const generateRandom = max => Math.floor(Math.random() * max)
const indexOfMax = array => array.indexOf(Math.max(...array)) // Toimii, kun ei ole kovin montaa anekdoottia.

const Anecdote = ({ title, anecdote, votes }) => (
    <>
        <h1>{title}</h1>
        <p>{anecdote}</p>
        <Vote votes={votes} />
    </>
)

const Vote = ({ votes }) => <p>has {votes} votes</p>

const Button = ({ onClick, text, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
        {text}
    </button>
)

const App = (props) => {

    // Arvotaan heti alkuun jokin satunnainen anekdootti.
    const [selected, setSelected] = useState(generateRandom(anecdotes.length))
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    // Estetään saman anekdootin tuleminen kaksi kertaa peräkkäin.
    const setToSelected = () => {
        let number
        do { number = generateRandom(anecdotes.length) }
        while (number === selected)
        return (setSelected(number))
    }

    const setVote = (index) => {
        const points = [...votes] // Kopioidaan olemassa olevat arvot
        points[index] += 1 // Kasvatetaan tiettyä arvoa yhdellä
        setVotes(points) // Asetetaan tilaan uudet arvot
    }

    // Toistaiseksi useaan kertaan äänestäminen on täysin mahdollista.
    return (
        <div>
            <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
            <Button onClick={() => setVote(selected)} text="vote" disabled={false} />
            <Button onClick={() => setToSelected()} text="next anecdote" disabled={false} />
            <Anecdote title="Anecdote with most votes" anecdote={anecdotes[indexOfMax(votes)]} votes={votes[indexOfMax(votes)]} />
        </div>
    )

}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)