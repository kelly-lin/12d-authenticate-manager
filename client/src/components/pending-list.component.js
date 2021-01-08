import React, { Component, useState } from 'react';
import axios from 'axios';
import { accessLevels } from '../services/users'

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ApproveUserForm from './approve-user-form.component';

const ActionButtons = props => {
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

const UserRow = props => {
  const dateOptions = {
    dateStyle: 'short',
    timeStyle: 'short'
  }

  return (
    <tr>
      <td>{ props.user.username }</td>
      <td>{ props.user.name }</td>
      <td>{ new Intl.DateTimeFormat('en-au',dateOptions).format(new Date(props.user.createdAt)) }</td>
      <td><ActionButtons user={ props.user } handleHideUser={ props.handleHideUser } /></td>
    </tr>
  )
}

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [] ,
      usersVisible: {} 
    }

    const getUsers = async () => {
      await axios.get('/users/pending')
              .then(res => {
                this.setState({ users: res.data });
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

  handleHideUser = userId => {
    let usersVisible = this.state.usersVisible;
    usersVisible[userId] = false;
    this.setState({ usersVisible:  usersVisible });
  }

  render() {
    return (
      this.state.users.map(user => {
        return (
          this.state.usersVisible[user._id] ? 
            <UserRow user={ user } handleHideUser={ this.handleHideUser }/> : null
        )
      })
    )
  }
}

const PendingList = props => {
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
        <UserList />
      </tbody>
    </Table>
  )
}

export default PendingList;