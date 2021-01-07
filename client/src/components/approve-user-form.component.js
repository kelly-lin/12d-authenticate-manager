import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';

const PermissionLevelButtons = props => {  
  const radios = [
    { name: 'Admin', value: '1' },
    { name: 'Restricted - 1 month', value: '2' },
    { name: 'Restricted - 6 months', value: '3' },
    { name: 'Restricted - 12 months', value: '4' },
  ];

  return radios.map((radio, idx) => {
    return <ToggleButton
              key={ idx }
              type="radio"
              variant="primary"
              name="radio"
              value={ radio.value }
              checked={ props.radioValue === radio.value }
              onChange={ props.onChangeUserPermissions }
            >
              { radio.name }
            </ToggleButton>
  })
}

export default class ApproveUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onChangeUserPermissions = this.onChangeUserPermissions.bind(this);
  }
  
  onChangeUserPermissions(e) {
    this.setState({ radioValue: e.currentTarget.value });
  }

  render() {
    return (
      <>
        <form>
          <Form.Group controlId="userPermissions">
            <Form.Label>Please select user permissions</Form.Label>
            <ButtonGroup toggle>
            <PermissionLevelButtons 
              onChangeUserPermissions={ this.onChangeUserPermissions }
              radioValue={ this.state.radioValue }
            />
            </ButtonGroup>
          </Form.Group>
        </form>
      </>
    )
  }
}


