import React from 'react'

const Row = ({ text, handleClick }) => (
  <>
    {text}&nbsp;
    <button onClick={handleClick}>show</button>
    <br />
  </>
)

export default Row