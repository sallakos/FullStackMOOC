import React, { useState } from 'react'
import Content from './components/Content'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {

    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    }

    // Mapataan persons-array pelkäksi nimi-arrayksi.
    if (persons.map((persons) => persons.name).indexOf(newName) !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={search} onChange={handleSearch} /></div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} placeholder='new name' />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} placeholder='new number' />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Content people={persons} search={search} />
    </div>

  )

}

export default App