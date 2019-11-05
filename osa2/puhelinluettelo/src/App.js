import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Message from './components/Message'
import contactService from './services/contacts'

const App = () => {

  // Statet.
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

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

    const personNames = persons.map(persons =>
      persons.name.trim().toLowerCase()
    )

    // Mapataan persons-array pelkäksi nimi-arrayksi.
    // Jos nimi löytyy (poistetaan välilyönnit ja case sensitivity),
    // kysytään halutaanko vaihtaa numero. Muuten lisätään nimi.
    if (personNames.indexOf(newName.trim().toLowerCase()) !== -1) {

      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        // Jos numero halutaan vaihtaa, etsitään listasta muutettava henkilö.
        const personToEdit = persons.find(person =>
          person.name.trim().toLowerCase() === newName.trim().toLowerCase()
        )
        // Kopioidaan muutos ja vaihdetaan numero.
        const changedPerson = { ...personToEdit, number: newNumber }
        // Päivitetään muutos.
        contactService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== personToEdit.id ? person : returnedPerson)
            )
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }

    } else {
      contactService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
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
          setMessage(`Removed ${personToRemove.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
        })
    }
  }

  // Renderöinti.
  return (
    <div>
      <h2>Phonebook</h2>      
      <Message message={message} />
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