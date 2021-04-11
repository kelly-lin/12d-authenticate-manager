import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import getUserAccessLevel from '../services/users';
import LoaderSpinner from './loader-spinner.component';
import Button from 'react-bootstrap/Button';

function AccessModifierButtons(props) {
  function handleClick() {
    window.location.href = '/users/profile/' + props.user._id;
  }

  return(
    <>
      <Button 
        variant="primary"
        size="sm" 
        onClick={ handleClick }
      >
        Profile
      </Button>{ ' ' }
    </>
  )
}

function UserRow(props) {
  let lastAccess = props.user.lastAccess ?? new Date() ;
  let lastAccessDate = new Date(lastAccess);

  return (
    <tr>
      <td>{props.user.username}</td>
      <td>{props.user.name}</td>
      <td>{new Intl.DateTimeFormat('en-au').format(lastAccessDate)}</td>
      <td>{getUserAccessLevel(props.user)}</td>
      <td><AccessModifierButtons user={props.user} /></td>
    </tr>
  )
}

function UserRows(props) {
  return props.users.map(user => {
    return <UserRow user={user} />;
  })
}

function UsersTable(props) {
  if(props.isLoading) {
    return <LoaderSpinner />
  } else {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Last active</th>
            <th>Access level</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <UserRows users={props.users} />
        </tbody>
      </Table>
    )
  }
}

export default class UserList extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      users: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get('/users')
      .then(res => {
        this.setState({ 
          users: res.data, 
          isLoading: false 
        });
      });
  }
  
  render() {
    return (
      <UsersTable 
        users={this.state.users} 
        isLoading={this.state.isLoading} 
      />
    );
  }
}