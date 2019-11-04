import React from 'react'

const Person = ({ person, handleClick }) =>
  <>
    {person.name}&nbsp;
    {person.number}&nbsp;
    <button onClick={() => handleClick(person.id)}>delete</button>
    <br />
  </>

export default Person