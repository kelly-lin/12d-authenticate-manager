import { Component } from 'react';
// import axios from 'axios';

export default class Metrics extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <p>Most used macro:</p>
        <p>Total number of users:</p>
        <p>Number of users approved:</p>
        <p>Number of users denied:</p>
      </div>
    )
  }
}