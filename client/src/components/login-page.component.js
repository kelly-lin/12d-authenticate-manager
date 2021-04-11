import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/users/login', this.state);
  }

  handleFormChange(event) {
    if(event.target.name === 'email') {
      this.setState({ email: event.target.value});
    }

    if(event.target.name === 'password') {
      this.setState({ password: event.target.value});
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              name="email" 
              type="email" 
              placeholder="Enter email" 
              onChange={this.handleFormChange} 
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              name="password" 
              type="password" 
              placeholder="Password"  
              onChange={this.handleFormChange} 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <button type="button" class="btn btn-link">
            Register
          </button>
        </Form>

        <div>
            <button type="button" class="btn btn-light">
              Demo
            </button>
        </div>
      </div>
    );
  }
}