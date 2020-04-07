import React, { Component } from 'react'
import { Card, Button, Media, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../../../vendor/libs/nouislider-react/nouislider-react.scss'
import '../../../vendor/styles/pages/products.scss'
import { STATUSES } from '../../../shared/constants/projects'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import '../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const { SearchBar } = Search

class ProjectsTable extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Projects Table - Pages')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10
    
    const columns = [{
      text: 'Project',
      dataField: 'title',
      sort: true,
      classes: 'py-2 align-middle',
      headerStyle: { minWidth: '300px' },
      formatter: (cell, row) => {
        return (
          <Media className="align-items-center">
            <img className="d-block ui-w-40" src={`${process.env.PUBLIC_URL}/img/${row.imageUrl}`} alt="" />
            {/* Generate link to project here */}
            <a href="#d" onClick={this.prevent} className="media-body d-block text-body ml-3">{row.title}</a>
          </Media>
        )
      }
    }, {
      text: 'Users',
      dataField: 'users',
      sort: true,
      classes: 'py-2 align-middle'
    }, {
      text: 'Resources',
      dataField: 'resources',
      sort: true,
      classes: 'py-2 align-middle'
    }, {
      text: 'Risk Score',
      dataField: 'riskScore',
      sort: true,
      classes: 'py-2 align-middle',
      formatter: (cell, row) => {
        return (<React.Fragment>
          {row.riskScore}%
        </React.Fragment>)
      }
    }, {
      text: 'Created',
      dataField: 'created',
      sort: true,
      classes: 'py-2 align-middle'
    }, {
      text: 'Last Activity',
      dataField: 'lastActivity',
      sort: true,
      classes: 'py-2 align-middle'
    }, {
      text: 'Status',
      dataField: 'status',
      sort: true,
      classes: 'py-2 align-middle',
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Badge variant={`outline-${STATUSES[row.status-1].icon}`}>
              {STATUSES[row.status-1].label}
            </Badge>
          </React.Fragment>
        )
      }
    }, {
      isDummyField: true,
      text: '',
      dataField: 'actions',
      classes: 'py-2 align-middle text-nowrap',
      formatter: (cell, row) => (<React.Fragment>
        <OverlayTrigger overlay={<Tooltip>Show</Tooltip>}>
          <Button variant="default btn-xs icon-btn md-btn-flat"><i className="ion ion-md-eye"></i></Button>
        </OverlayTrigger>
        &nbsp;
        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
          <Button variant="default btn-xs icon-btn md-btn-flat"><i className="ion ion-md-create"></i></Button>
        </OverlayTrigger>
      </React.Fragment>)
    }]

    return (
      <div>
        {isIE10Mode && <div className="alert alert-danger">
          <strong>react-bootstrap-table2</strong> doesn't support Internet Explorer 10
        </div>}

        {!isIE10Mode &&
          <Card>
            <ToolkitProvider
              keyField="title"
              data={this.props.data}
              columns={columns}
              bootstrap4
              search>
              {props => (<React.Fragment>
                {/* Search bar */}
                <Card.Body className="d-flex justify-content-end pb-0">
                  <div style={{ maxWidth: '300px' }}>
                    <SearchBar {...props.searchProps} />
                  </div>
                </Card.Body>

                <BootstrapTable
                  {...props.baseProps}
                  wrapperClasses="table-responsive react-bs-table-card"
                  classes="projects-table card-table table-striped border-top"
                  pagination={paginationFactory()}
                />
              </React.Fragment>)}
            </ToolkitProvider>
          </Card>
        }
      </div>
    )
  }
}

export default ProjectsTable
