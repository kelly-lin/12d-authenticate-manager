import React, { Component, useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ApproveUserForm from './approve-user-form.component';

const ActionButtons = props => {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <ApproveUserForm />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary">Approve</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const User = props => {
  const dateOptions = {
    dateStyle: 'short',
    timeStyle: 'short'
  }
  return (
    <tr>
      <td>{ props.user.username }</td>
      <td>{ props.user.name }</td>
      <td>{ new Intl.DateTimeFormat('en-au',dateOptions).format(new Date(props.user.createdAt)) }</td>
      <td><ActionButtons /></td>
    </tr>
  );
}

export default class PendingList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] }
    
    this.userList = this.userList.bind(this);
  }

  userList() {
    return (
      this.state.users.map(user => {
        return <User key={ user._id } user={ user } />;
      })
    );
  }

  componentDidMount() {
    axios.get('/users/pending')
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
            <th>Date requested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { this.userList() }
        </tbody>
      </Table>
    );
  }
}