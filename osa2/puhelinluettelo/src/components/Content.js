import React from 'react'
import Person from './Person'

const Content = ({ people, search }) => {
  const filteredPeople = people.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
  const rows = () => filteredPeople.map(person => <Person key={person.name} person={person} />)
  return (
    <div>
      {rows()}
    </div>
  )
}

export default Content