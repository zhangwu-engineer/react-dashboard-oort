import React, { Component } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProjects } from "../../../../store/actions/projects"
import ProjectsList from './ProjectsList'
import ProjectsGrid from './ProjectsGrid'
import Loader from '../../../../shared/Loader'

class Projects extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Projects - Pages')

    this.state = {
      viewMode: 'col',
      sortBy: '',
      sortOrder: 'ASC',
    }
  }

  componentWillMount() {
    this.props.getProjects()
  }

  sortDynamic(a, b, sortBy, sortOrder) {
    const sortOrientation = sortOrder === 'ASC' ? 1 : -1
  
    if (sortBy === '') return 0
    if (a[sortBy] instanceof Date) {
      const secondsA = moment(a[sortBy]).valueOf()
      const secondsB = moment(b[sortBy]).valueOf()
      return (secondsA > secondsB) ? 1*sortOrientation : ((secondsB > secondsA) ? -1*sortOrientation : 0)
    } else if (isNaN(a[sortBy])) {
      return (a[sortBy] && a[sortBy].toString().localeCompare(b[sortBy]))*sortOrientation
    }
    return (a[sortBy] > b[sortBy]) ? 1*sortOrientation : ((b[sortBy] > a[sortBy]) ? -1*sortOrientation : 0)
  }

  setViewMode(viewMode) {
    this.setState({ viewMode })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {

    const { viewMode } = this.state
    const { projects } = this.props

    const sortedProjects =  [...projects]
      .sort((a, b) => this.sortDynamic(a, b, this.state.sortBy, this.state.sortOrder))

    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-2">
          <div>Projects</div>
        </h4>

        <div className="d-flex flex-wrap justify-content-between align-items-center ui-bordered px-3 pt-3 mb-4">
          <div>
            {/* View toggle */}
            <ButtonGroup className="mb-3">
              <Button variant="default icon-btn md-btn-flat" onClick={() => this.setViewMode('col')} active={this.state.viewMode === 'col'}><i className="ion ion-md-apps"></i></Button>
              <Button variant="default icon-btn md-btn-flat" onClick={() => this.setViewMode('row')} active={this.state.viewMode === 'row'}><i className="ion ion-md-menu"></i></Button>
            </ButtonGroup>
            {/* / View toggle */}
            <Link to="/new-project">
              <Button variant="outline-primary" className="mb-3 ml-3">
                  <span className="ion ion-md-add"></span>&nbsp; Create Project
              </Button>
            </Link>
          </div>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <Form className="form-inline">
              <Form.Label className="mr-sm-2">Sort order:</Form.Label>
              <Form.Control as="select" className="custom-select" value={this.state.sortOrder} onChange={e => this.setState({ sortOrder: e.target.value })}>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </Form.Control>
            </Form>
            <Form className="form-inline ml-4">
              <Form.Label className="mr-sm-2">Sort by:</Form.Label>
              <Form.Control as="select" className="custom-select" value={this.state.sortBy} onChange={e => this.setState({ sortBy: e.target.value })}>
                <option value="">All</option>
                <option value="name">Name</option>
                <option value="riskScore">Risk</option>
                <option value="lastActivity">Last Activity</option>
                <option value="created">Created</option>
              </Form.Control>
            </Form>
          </div>
        </div>
        {!sortedProjects && <Loader />  }
        {sortedProjects && sortedProjects.length === 0 &&
          <div className="layout-inner d-flex justify-content-center pb-2 mb-2">
            No data
          </div>
        }
        {sortedProjects && viewMode === 'row' &&
          <ProjectsList setTitle={this.props.setTitle} data={sortedProjects} />
        }
        {sortedProjects && viewMode === 'col' &&
          <ProjectsGrid setTitle={this.props.setTitle} data={sortedProjects} />
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => dispatch(getProjects())
  };
}

const mapStateToProps = state => {
  return { projects: state.projects.projects };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
