import React, { Component } from 'react'
import ToolkitProvider, { Search, ColumnToggle, CSVExport } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory from 'react-bootstrap-table2-filter'
import cellEditFactory from 'react-bootstrap-table2-editor'
import '../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'
import {connect} from "react-redux";
import {getLogs} from "../../store/actions/activityLogs";

const { SearchBar } = Search
const { ToggleList } = ColumnToggle
const { ExportCSVButton } = CSVExport

class ActivityLogs extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Activity Logs')

    this.state = {
      data: []
    }

    this.props.getLogs()
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10

    const columns = [{
      text: 'Request Timestamp',
      dataField: 'request_time',
      sort: true,
    }, {
      text: 'Host',
      dataField: 'request_host',
      sort: true,
    }, {
      text: 'Path',
      dataField: 'request_path',
      sort: true,
    }, {
      text: 'Method',
      dataField: 'request_method',
      sort: true,
    }, {
      text: 'Allowed',
      dataField: 'response_allowed',
      sort: true,
    }, {
      text: 'User ID',
      dataField: 'user_id',
      sort: true,
    }]

    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          Activity Logs
        </h4>

        {isIE10Mode && <div className="alert alert-danger">
          <strong>react-bootstrap-table2</strong> doesn't support Internet Explorer 10
        </div>}

        {!isIE10Mode && <React.Fragment>

          <ToolkitProvider
            keyField="request_time"
            data={this.props.logs}
            columns={columns}
            bootstrap4
            search
            columnToggle
            exportCSV>
            {props => (
              <div>
                <div className="row">
                  <div className="col-md-6 mb-4 mb-md-0"><ToggleList { ...props.columnToggleProps } /></div>
                  <div className="col-md-6 d-flex align-items-start justify-content-end">
                    <ExportCSVButton { ...props.csvProps } className="mr-2">Export</ExportCSVButton>
                    <SearchBar { ...props.searchProps } />
                  </div>
                </div>

                <BootstrapTable
                  {...props.baseProps }
                  wrapperClasses="table-responsive"
                  pagination = {paginationFactory()}
                  selectRow = {{ mode: 'checkbox', classes: 'table-success' }}
                  filter={filterFactory()}
                  cellEdit={ cellEditFactory({ mode: 'click' }) }
                />
              </div>
            )}
          </ToolkitProvider>
        </React.Fragment>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLogs: () => dispatch(getLogs())
  };
}

const mapStateToProps = state => {
  return { logs: state.activityLogs.logs };
};


export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogs)