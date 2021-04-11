import React, { Component } from 'react';
import axios from 'axios';
import Logs from './logs.component';

export default class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      offset: 0,
      pageCount: 0,
      isLoaded: false
    }

    this.loadLogsFromServer = this.loadLogsFromServer.bind(this);
  }

  loadLogsFromServer() {
    const pageNum = this.state.offset + 1;
    axios.get('logs/page/' + pageNum)
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
    console.log(data);
    let offset = data.selected;

    this.setState({ offset: offset }, () => {
      this.loadLogsFromServer();
    });
  }

  componentDidMount() {
    this.loadLogsFromServer();
  }

  render() {
    return (
      <div>
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