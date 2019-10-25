import React from 'react'
import Person from './Person'

const Content = ({ people }) => {
  const rows = () => people.map(person => <Person key={person.name} person={person} />)
  return (
    <div>
      {rows()}
    </div>
  )
}

export default Content