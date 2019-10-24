import React from 'react'

const Total = ({ parts }) => {

  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((a, b) => a + b, 0)

  return (
    <p><strong>Number of exercises {sum}</strong></p>
  )
}

export default Total