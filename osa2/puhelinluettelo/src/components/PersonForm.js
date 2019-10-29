import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
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
  )

export default PersonForm