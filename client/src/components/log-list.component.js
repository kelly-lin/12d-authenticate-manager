import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const LogLine = props => {
  const accessDate = new Date(props.log.accessDate);

  return (
    <tr>
      <td>{ props.log.username }</td>
      <td>{ props.log.name }</td>
      <td>{ props.log.projectName }</td>
      <td>{ props.log.macroName }</td>
      <td>{ new Intl.DateTimeFormat('en-au').format(accessDate) }</td>
      <td>{ accessDate.toLocaleTimeString() }</td>
    </tr>
  )
}

export default class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] }
    this.LogLines = this.LogLines.bind(this);
  }

  componentDidMount() {
    axios.get('/logs')
      .then(res => {
        const logs = res.data;
        this.setState({ logs: logs });
      })
  }

  LogLines() {
    return this.state.logs.map(log => {
      return <LogLine log={ log } />
    })
  }

  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Project name</th>
                <th>Macro name</th>
                <th>Access date</th>
                <th>Access time</th>
              </tr>
            </thead>
            <tbody>
              { this.LogLines() }
            </tbody>
        </Table>
      </div>
    );
  }
}