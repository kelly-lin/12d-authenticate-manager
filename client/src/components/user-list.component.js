import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import getUserAccessLevel from '../services/users';

const User = props => {
 return (
  <tr>
    <td>{ props.user.username }</td>
    <td>{ props.user.name }</td>
    <td>31/12/2020</td>
    <td>{ getUserAccessLevel(props.user) }</td>
  </tr>
 );
}

export default class UserList extends Component {
  constructor(props) {
    super(props);
    
    this.userList = this.userList.bind(this);
    this.state = { users: [] };
  }

  userList() {
    return this.state.users.map(user => {
      return <User user={user} />;
    });
  }

  componentDidMount() {
    axios.get('/users')
      .then(res => {
        this.setState({ users: res.data });
      });
  }
  
  render() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Last active</th>
            <th>Access level</th>
          </tr>
        </thead>
        <tbody>
          { this.userList() }
        </tbody>
      </Table>
    );
  }
}