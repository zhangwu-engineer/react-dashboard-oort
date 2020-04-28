import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Button, Media, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../../../../../vendor/libs/nouislider-react/nouislider-react.scss'
import '../../../../../vendor/styles/pages/products.scss'
import { STATUSES } from '../../../../../shared/constants/projects'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import '../../../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const { SearchBar } = Search

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Projects List - Pages')
  }

  prevent(e) {
    e.preventDefault()
  }

  handleDeleteProject(id) {
    this.props.deleteProject(id)
  }

  renderColumns(data) {
    const singleProject = data.length > 0 && data[0]

    let columns = [{
      text: 'Project',
      dataField: 'name',
      sort: true,
      classes: 'py-2 align-middle',
      headerStyle: { minWidth: '300px' },
      formatter: (cell, row) => {
        const imageUrl = row.imageUrl ? row.imageUrl : `https://ui-avatars.com/api/?name=${row.name}`
        return (
          <Media className="align-items-center">
            <img className="d-block ui-w-40" src={imageUrl} alt="" />
            {/* Generate link to project here */}
            <a href={`/projects/${row.id}/view`} className="media-body d-block text-body ml-3">{row.name}</a>
          </Media>
        )
      }
    }]

    if (singleProject.users) {
      columns.push({
        text: 'Users',
        dataField: 'users',
        sort: true,
        classes: 'py-2 align-middle'
      })
    }
    if (singleProject.resources) {
      columns.push({
        text: 'Resources',
        dataField: 'resources',
        sort: true,
        classes: 'py-2 align-middle'
      })
    }
    if (singleProject.riskScore) {
      columns.push({
        text: 'Risk Score',
        dataField: 'riskScore',
        sort: true,
        classes: 'py-2 align-middle',
        formatter: (cell, row) => {
          return (<React.Fragment>
            {row.riskScore}%
          </React.Fragment>)
        }
      })
    }
    if (singleProject.created) {
      columns.push({
        text: 'Created',
        dataField: 'created',
        sort: true,
        classes: 'py-2 align-middle'
      })
    }
    if (singleProject.lastActivity) {
      columns.push({
        text: 'Last Activity',
        dataField: 'lastActivity',
        sort: true,
        classes: 'py-2 align-middle'
      })
    }
    if (singleProject.status) {
      columns.push({
        text: 'Status',
        dataField: 'status',
        sort: true,
        classes: 'py-2 align-middle',
        formatter: (cell, row) => {
          const iconName = row.status ? `${STATUSES[row.status].icon}` : 'outline'
          const statusLabel = row.status ? STATUSES[row.status].label : 'N/A'
          return (
            <React.Fragment>
              <Badge variant={iconName}>
                {statusLabel}
              </Badge>
            </React.Fragment>
          )
        }
      })
    }
    columns.push({
      isDummyField: true,
      text: 'Actions',
      dataField: 'actions',
      classes: 'py-2 align-middle text-nowrap',
      formatter: (cell, row) => (<React.Fragment>
        <OverlayTrigger overlay={<Tooltip>Show</Tooltip>}>
          <Button variant="default btn-xs icon-btn md-btn-flat" as={NavLink} to={`/projects/${row.id}/view`}>
            <i className="ion ion-md-eye"></i>
          </Button>
        </OverlayTrigger>
        &nbsp;
        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
          <Button variant="default btn-xs icon-btn md-btn-flat" as={NavLink} to={`/projects/${row.id}/edit`}>
            <i className="ion ion-md-create"></i>
          </Button>
        </OverlayTrigger>
        &nbsp;
        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
          <Button variant="default btn-xs icon-btn md-btn-flat" onClick={() => this.handleDeleteProject(row.id)}>
            <i className="ion ion-md-trash"></i>
          </Button>
        </OverlayTrigger>
      </React.Fragment>)
    })

    return columns
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10
    const { data } = this.props    

    return (
      <div>
        {isIE10Mode && <div className="alert alert-danger">
          <strong>react-bootstrap-table2</strong> doesn't support Internet Explorer 10
        </div>}

        {!isIE10Mode &&
          <Card>
            <ToolkitProvider
              keyField="name"
              data={data}
              columns={this.renderColumns(data)}
              bootstrap4
              search>
              {props => (<React.Fragment>
                {/* Search bar */}
                <Card.Body className="d-flex justify-content-end pt-2 pr-2 pb-0">
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

export default ProjectsList
