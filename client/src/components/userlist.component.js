import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export default class Userlist extends Component {
  render() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Access level</th>
            <th>Last active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AUKL500446</td>
            <td>Lin, Kelly</td>
            <td>Admin</td>
            <td>31/12/2020</td>
            <td>Approved</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}