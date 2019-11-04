import React from 'react'
import Person from './Person'

const Content = ({ people, search, handleClick }) => {
  const filteredPeople = people.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
  const rows = () => filteredPeople.map(person => <Person key={person.name} person={person} handleClick={handleClick} />)
  return (
    <div>
      {rows()}
    </div>
  )
}

export default Content