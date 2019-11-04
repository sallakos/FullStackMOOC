import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import contactService from './services/contacts'

const App = () => {

  // Statet.
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // Aluksi haetaan olemassa olevat numerot.
  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  // Kun kirjoitetaan uutta nimeä, asetetaan tila aina muutoksen myötä.
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Sama numerolle (kts. yllä).
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Sama haulle (kts. yllä).
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  // Lisätään henkilö.
  const addPerson = (event) => {

    event.preventDefault() // Estetään lomakkeen lähetys.

    // Alustetaan henkilö.
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Mapataan persons-array pelkäksi nimi-arrayksi.
    // Jos nimi löytyy (poistetaan välilyönnit ja case sensitivity),
    // ilmoitetaan asiasta. Jos ei, lisätään osoitekirjaan.
    if (persons.map(persons => persons.name.trim().toLowerCase())
      .indexOf(newName.trim().toLowerCase()) !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      contactService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  // Poistetaan henkilö jos käyttäjä haluaa.
  const removePerson = id => {
    const personToRemove = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  // Renderöinti.
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Content
        people={persons}
        search={search}
        handleClick={removePerson} />
    </div>

  )

}

export default App