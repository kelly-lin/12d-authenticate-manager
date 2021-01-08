import React, { Component } from 'react';
import { accessLevels } from '../services/users';
import axios from 'axios';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';

const permissionRadioValues = {
  admin: '1',
  restricted: {
    oneMonth: '2',
    sixMonths: '3',
    twelveMonths: '4'
  }
}

const radios = [
  { name: 'Admin', value: permissionRadioValues.admin },
  { name: 'Restricted - 1 month', value: permissionRadioValues.restricted.oneMonth },
  { name: 'Restricted - 6 months', value: permissionRadioValues.restricted.sixMonths },
  { name: 'Restricted - 12 months', value: permissionRadioValues.restricted.twelveMonths },
];

const PermissionLevelButtons = props => {
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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUserPermissions = this.onChangeUserPermissions.bind(this);
  }

  onChangeUserPermissions(e) {
    this.setState({ radioValue: e.currentTarget.value });
  }

  onSubmit(e) {
    let accessLevel = null;
    let numOfMonths = null;

    switch(this.state.radioValue) {
      case permissionRadioValues.admin:
        accessLevel = accessLevels.admin.code;
        break;

      case permissionRadioValues.restricted.oneMonth:
        accessLevel = accessLevels.restricted.code;
        numOfMonths = 1;
        break;

      case permissionRadioValues.restricted.sixMonths:
        accessLevel = accessLevels.restricted.code;
        numOfMonths = 6;
        break;

      case permissionRadioValues.restricted.twelveMonths:
        accessLevel = accessLevels.restricted.code;
        numOfMonths = 12;
        break;

      default:
        accessLevel = null;
        numOfMonths = 0;
    }

    if(accessLevel != null) {
      this.props.user.accessLevel = accessLevel;

      if(accessLevel === accessLevels.restricted.code){
        let todayDate = new Date();
        let expiryDate = new Date(
          todayDate.setMonth(
            todayDate.getMonth() + numOfMonths
          )
        );
        this.props.user.expiryDate = expiryDate;
      }

      this.props.user.isPending = false;
      console.log(this.props.user);
      const data = this.props.user;
      axios.post('/users/update/' + this.props.user._id, data);
    }
  }

  render() {
    return (
      <form
        id="user-permissions-form"
        onSubmit={ () => {
          this.onSubmit();
          this.props.handleHideUser(this.props.user._id);
        }}
      >
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
    )
  }
}


