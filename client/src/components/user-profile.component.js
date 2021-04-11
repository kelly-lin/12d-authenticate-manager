import axios from 'axios';
import { Component } from 'react';
import LoaderSpinner from './loader-spinner.component';
import 
  getUserAccessLevel, 
  { UserAccessLevelOptions, accessLevels } from '../services/users';
import Logs from './logs.component';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';

class UserLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      logs: [],
      isLoaded: false,
      offset: 0,
      pageCount: 0
    }

    this.loadLogsFromServer = this.loadLogsFromServer.bind(this);
  }

  componentDidMount() {
    this.loadLogsFromServer();
  }

  loadLogsFromServer() {
    const pageNum = this.state.offset + 1;
    axios.get('/logs/' + this.state.user.username + '/page/' + pageNum)
      .then(res => {
        const logs = res.data.docs;
        const pageCount = res.data.totalPages;

        this.setState({
          logs: logs,
          pageCount: pageCount,
          isLoaded: true
        });
      });
  }

  handlePageClick = data => {
    let offset = data.selected;

    this.setState({ offset: offset }, () => {
      this.loadLogsFromServer();
    });
  }

  render() {
    return (
      <div>
        <h2>Logs</h2>
        <Logs 
          logs={this.state.logs} 
          pageCount={this.state.pageCount}
          handlePageClick={this.handlePageClick}
          isLoaded={this.state.isLoaded}
        />
      </div>
    )
  }
}

function FormSubmitButton(props) {
  if(props.isEditing) {
    return (               
      <Button variant="primary" type="submit">
        Done
      </Button>
    )
  } else {
    return null;
  }
}

function EditProfileButton(props) {
  if(!props.isEditing) {
    return (               
      <Button 
        variant="primary"
        size="sm"
        onClick={ props.handleClickEditForm }
      >
      Edit
      </Button>
    )
  } else {
    return null;
  }
}

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.match.params.id,
      isEditing: false
    }

    this.handleClickEditForm = this.handleClickEditForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccessLevelChange = this.handleAccessLevelChange.bind(this);
  }

  componentDidMount() {
    axios.get('/users/profile/' + this.state.userId)
      .then(res => this.setState({ user: res.data }));
  }

  handleClickEditForm() {
    this.setState({ isEditing: true });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = this.state.user;

    axios.post('/users/update/' + user._id, user)
      .then(this.setState({ isEditing: false }));
  }

  handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const user = this.state.user ?? {};
    user[name] = value;

    this.setState({ user: user });
  }

  handleAccessLevelChange(event) {
    const choice = event.target.value;
    let choiceCode = -1;
    switch(choice) {
      case accessLevels.admin.text: {
        choiceCode = accessLevels.admin.code;
        break;
      }

      case accessLevels.restricted.text: {
        choiceCode = accessLevels.restricted.code;
        break;
      }

      case accessLevels.denied.text: {
        choiceCode = accessLevels.denied.code;
        break;
      }

      default: {
        choiceCode = -1;
        break;
      }
    }
    console.log(choiceCode);
    if(choiceCode !== -1) {
      const user = this.state.user;
      user['accessLevel'] = choiceCode;
      this.setState({ user: user });
    }
  }

  render() {
    if(this.state.user){
      const accessDate = this.state.user.lastAccess;
      let lastAccessText = accessDate ? 
        new Intl.DateTimeFormat('en-au').format(new Date(accessDate)) : 
        'Unknown'

      return(
        <>
          <div>
            <h2>
              User profile {' '}
              <span>
                <EditProfileButton 
                  isEditing={this.state.isEditing} 
                  handleClickEditForm={this.handleClickEditForm}
                />
              </span>
            </h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name='name'
                    defaultValue={this.state.user.name} 
                    readOnly={!this.state.isEditing}
                    onChange={this.handleFormChange}
                  />
                </Col>
              </Form.Group>
  
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name='email'
                    type='email'
                    defaultValue={this.state.user.email}
                    readOnly={!this.state.isEditing}
                    onChange={this.handleFormChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalUsername">
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control 
                    name='username'
                    defaultValue={this.state.user.username} 
                    readOnly={!this.state.isEditing}
                    onChange={this.handleFormChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalAccessLevel">
                <Form.Label column sm={2}>
                  Access Level
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name='accessLevel'
                    as="select"
                    disabled={!this.state.isEditing}
                    defaultValue={getUserAccessLevel(this.state.user)}
                    onChange={this.handleAccessLevelChange}
                  >
                  <UserAccessLevelOptions />
                  </Form.Control>
                </Col>
              </Form.Group>
              
              <div>Project approved: {this.state.user.projectApproved}</div>
              <div>Last access: {lastAccessText}</div>
              <br/>
              <FormSubmitButton isEditing={this.state.isEditing}/>
            </Form>
            <br/>
          </div>
          <br/>
          <div>
            <UserLogs user={this.state.user}/>
          </div>
        </>
      )
    } else {
      return <LoaderSpinner />
    }
  }
};