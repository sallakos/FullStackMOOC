import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Menu = ({ name, handleLogout }) => (
  <Navigation>
    <NavLink to="/">blogs</NavLink>
    <NavLink to="/users">users</NavLink>
    <Log>
      {name} logged in <button onClick={handleLogout}>logout</button>
    </Log>
  </Navigation>
)

const Navigation = styled.nav`
  background-color: lightgrey;
  padding: 5px;
`

const NavLink = styled(Link)`
  padding: 5px;
`

const Log = styled.span`
  padding: 5px;
  display: inline-block;
`
