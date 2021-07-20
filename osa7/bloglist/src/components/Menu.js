import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Menu = ({ name, handleLogout }) => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/">Blogs</NavLink>
        <NavLink to="/users">Users</NavLink>
      </Nav>
      <Nav>
        <Log>
          {name} logged in{' '}
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </Log>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const NavLink = styled(Link)`
  padding: 5px;
`

const Log = styled.span`
  padding: 5px;
  display: inline-block;
`
