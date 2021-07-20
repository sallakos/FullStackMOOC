import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const { buttonLabel, children } = props

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <>
      <Button
        style={{ display: !visible ? 'block' : 'none' }}
        onClick={toggleVisibility}
      >
        {buttonLabel}
      </Button>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <div>{children}</div>
        <Button variant="info" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
