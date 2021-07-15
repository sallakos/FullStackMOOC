import React, { useImperativeHandle, useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const { buttonLabel, children } = props

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <>
      <button
        style={{ display: !visible ? 'block' : 'none' }}
        onClick={toggleVisibility}
      >
        {buttonLabel}
      </button>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <div>{children}</div>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})

export default Togglable
