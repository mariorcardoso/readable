import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Navigation =  () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Readable</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/">All</NavItem>
      <NavItem eventKey={2} href="/react">React</NavItem>
      <NavItem eventKey={3} href="/redux">Redux</NavItem>
      <NavItem eventKey={4} href="/udacity">Udacity</NavItem>
    </Nav>
  </Navbar>
)

export default Navigation;
