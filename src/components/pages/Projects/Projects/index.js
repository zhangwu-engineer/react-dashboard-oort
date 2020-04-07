import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProjects } from "../../../../store/actions/projects"
import ProjectsTable from '../../ProjectsTable'
import ProjectsList from '../../ProjectsCard'

class Projects extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Projects - Pages')

    this.state = {
      viewMode: 'col',
      data: [],
    }
  }

  componentWillMount() {
    this.props.getProjects()
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

    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-2">
          <div>Projects</div>
        </h4>

        <div className="d-flex flex-wrap justify-content-between ui-bordered px-3 pt-3 mb-4">
          <div>
            {/* View toggle */}
            <ButtonGroup className="mb-3">
              <Button variant="default icon-btn md-btn-flat" onClick={() => this.setViewMode('col')} active={this.state.viewMode === 'col'}><i className="ion ion-md-apps"></i></Button>
              <Button variant="default icon-btn md-btn-flat" onClick={() => this.setViewMode('row')} active={this.state.viewMode === 'row'}><i className="ion ion-md-menu"></i></Button>
            </ButtonGroup>
            {/* / View toggle */}
          </div>
          <Link to="/new-project">
            <Button variant="outline-primary" className="mb-3 ml-3">
                <span className="ion ion-md-add"></span>&nbsp; Create Project
            </Button>
          </Link>
        </div>

        {viewMode === 'row' && 
          <ProjectsTable setTitle={this.props.setTitle} data={projects} />
        }
        {viewMode === 'col' && 
          <ProjectsList setTitle={this.props.setTitle} data={projects} />
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
