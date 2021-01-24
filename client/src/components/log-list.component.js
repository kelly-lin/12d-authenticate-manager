import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import LoaderSpinner from './loader-spinner.component';
import ReactPaginate from 'react-paginate';

const LogLine = props => {
  const accessDate = new Date(props.log.accessDate);

  return (
    <tr>
      <td>{props.log.username}</td>
      <td>{props.log.name}</td>
      <td>{props.log.projectName}</td>
      <td>{props.log.macroName}</td>
      <td>{new Intl.DateTimeFormat('en-au').format(accessDate)}</td>
      <td>{accessDate.toLocaleTimeString()}</td>
    </tr>
  )
}

export default class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      page: 1
    }

    this.LogLines = this.LogLines.bind(this);
    this.loadLogsFromServer = this.loadLogsFromServer.bind(this);
  }

  loadLogsFromServer() {
    axios.get('logs/page/' + this.state.page)
      .then(res => {
        const logs = res.data.docs;
        const pageCount = res.data.totalDocs;

        this.setState({
          logs: logs,
          pageCount: pageCount
        });
      });
  }

  handlePageClick = data => {
    console.log(data);
    let selected = data.selected;

    this.setState({ page: selected }, () => {
      this.loadLogsFromServer();
    });
  }

  componentDidMount() {
    this.loadLogsFromServer();
  }

  LogLines() {
    if(this.state.logs.length === 0){
      return (
        <div style={{textAlign: "center"}}>
          <LoaderSpinner />
        </div>
      )
    } 

    return this.state.logs.map(log => {
      return <LogLine log={log} />
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
              {this.LogLines()}
            </tbody>
        </Table>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}