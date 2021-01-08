
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>12d Authentication Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/userlist">
              <Nav.Link>Userlist</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/pending">
              <Nav.Link>Pending</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/log">
              <Nav.Link>Log</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/metrics">
              <Nav.Link>Metrics</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
