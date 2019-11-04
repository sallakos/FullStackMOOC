import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

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

    contactService

      .create(personObject)
      .then(returnedPerson => {

        // Mapataan persons-array pelkäksi nimi-arrayksi.
        if (persons.map((persons) => persons.name).indexOf(newName) !== -1) {
          alert(`${newName} is already added to phonebook`)
        } else {
          setPersons(persons.concat(personObject))
        }

        setNewName('')
        setNewNumber('')

      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Content people={persons} search={search} />
    </div>

  )

}

export default App