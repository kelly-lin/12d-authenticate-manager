import Table from 'react-bootstrap/Table';
import LoaderSpinner from './loader-spinner.component';
import ReactPaginate from 'react-paginate';

function LogLine(props) {
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

function LogLines(props) {
  return props.logs.map(log => {
    return <LogLine key={log._id} log={log} />
  })
}

function LogTable(props) {
  return (
    <>
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
          <LogLines logs={props.logs}/>
        </tbody>
      </Table>
      <div className='pagination-container'>
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={props.handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
      </div>
    </>
  )
}

export default function Logs(props) {
  if(props.isLoaded){
    if(props.logs.length !== 0) {
      return (
        <LogTable 
          logs={props.logs} 
          pageCount={props.pageCount}
          handlePageClick={props.handlePageClick}
        />
      )
    } else {
      return <div>No logs</div>
    }
  } else {
    return <LoaderSpinner />
  }
}