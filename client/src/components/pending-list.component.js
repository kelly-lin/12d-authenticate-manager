import React, { Component, useState } from 'react';
import axios from 'axios';
import { accessLevels } from '../services/users'

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ApproveUserForm from './approve-user-form.component';
import LoaderSpinner from './loader-spinner.component';

function ActionButtons(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleDeny = () => {
    props.user.accessLevel = accessLevels.denied.code;
    props.user.isPending = false;
    axios.post('/users/update/' + props.user._id, props.user);
    props.handleHideUser(props.user._id);
  }

  return (
    <>
      <Button 
        variant="primary"
        size="sm" 
        onClick={ handleShow }
      >
        Approve
      </Button>{ ' ' }
      <Button 
        variant="secondary" 
        size="sm"
        onClick= { handleDeny }
      > 
        Deny
      </Button>

      <Modal
        show={ show }
        onHide={ handleClose }
        backdrop="static"
        keyboard={ false }
      >
        <Modal.Header>
          <Modal.Title>Approve user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApproveUserForm user={ props.user } handleHideUser={ props.handleHideUser }/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button type="submit" 
            form="user-permissions-form" 
            variant="primary"
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function PendingUserRow(props) {
  const dateOptions = {
    dateStyle: 'short',
    timeStyle: 'short'
  }

  return (
    <tr>
      <td>{ props.user.username }</td>
      <td>{ props.user.name }</td>
      <td>
        {
          new Intl
                .DateTimeFormat('en-au', dateOptions)
                .format(new Date(props.user.createdAt))
        }
      </td>
      <td><ActionButtons user={ props.user } handleHideUser={ props.handleHideUser } /></td>
    </tr>
  )
}

function PendingUsers(props) {
  return props.users.map(user => {
    return (
      props.usersVisible[user._id] ? 
        <PendingUserRow user={user} handleHideUser={props.handleHideUser}/> : null
    )
  });
}

function UserListTable(props) {
  if(props.isLoading) {
    return <LoaderSpinner />
  } else if(props.users.length === 0 && !props.isLoading) {
    return <div>No users pending!</div>
  } else {

    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Date requested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <PendingUsers 
            handleHideUser={props.handleHideUser} 
            users={props.users} 
            usersVisible={props.usersVisible}
          />
        </tbody>
      </Table>
    )
  }
}

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [] ,
      usersVisible: {},
      isLoading: true
    }

    const getUsers = async () => {
      await axios.get('/users/pending')
              .then(res => {
                this.setState({ 
                  users: res.data, 
                  isLoading: false 
                });
              });
      
      let usersVisible = {};
      this.state.users.forEach(user => {
        usersVisible[user._id] = true;
      });

      await this.setState({ usersVisible: usersVisible });
    }

    getUsers();

    this.handleHideUser = this.handleHideUser.bind(this);
  }

  handleHideUser(userId) {
    let usersVisible = this.state.usersVisible;
    usersVisible[userId] = false;
    this.setState({ usersVisible:  usersVisible });
  }

  render() {
    return (
      <UserListTable 
        users={this.state.users} 
        usersVisible={this.state.usersVisible}
        handleHideUser={this.handleHideUser}
        isLoading={this.state.isLoading}
      />
    )
  }
}