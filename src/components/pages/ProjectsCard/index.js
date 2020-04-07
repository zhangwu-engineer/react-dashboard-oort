import React, { Component } from 'react'
import moment from 'moment'
import { Card, ProgressBar, Form, Row, Col, Badge, DropdownButton, Dropdown } from 'react-bootstrap'

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Project list - Pages')

    this.state = {
      statuses: {
        1: { title: 'Active', color: 'success' },
        2: { title: 'Pending', color: 'warning' }
      },

      sortBy: '',
      sortOrder: 'ASC',

      additionalData: {
        team: [
          { avatar: '2-small.png' },
          { avatar: '3-small.png' },
          { avatar: '4-small.png' },
          { avatar: '5-small.png' },
          { avatar: '6-small.png' }
        ]
      },
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  renderSingleProjectCard(project) {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl'

    return (
      <Col sm={6} xl={4} key={project.title}>
        <Card className="mb-4">
          <Card.Body className="d-flex justify-content-between align-items-start pb-3">
            <div className="d-flex align-items-center pb-3">
              <div>
                <img src={`${process.env.PUBLIC_URL}/img/${project.imageUrl}`} alt="Project Logo" className="ui-h-40 ui-bordered mr-3" />
              </div>
              <div>
                <a href="#d" onClick={this.prevent} className="text-body text-big font-weight-semibold">{project.title}</a>
                <Badge className="align-text-bottom ml-1">{project.status}</Badge>
                <div className="text-muted small mt-1">{project.users} users, {project.resources} resources</div>
              </div>
            </div>
            <DropdownButton variant="default icon-btn borderless rounded-pill md-btn-flat hide-arrow" size="sm" title={<i className="ion ion-ios-more"></i>} alignRight={!isRTL}>
              <Dropdown.Item>View</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Suspend</Dropdown.Item>
            </DropdownButton>
          </Card.Body>

          <ProgressBar now={project.riskScore} className="rounded-0" style={{ height: '3px' }} />
          <div className="card-body small pt-2 pb-0">
            <strong>{project.riskScore}%</strong> risk
          </div>

          <Card.Body className="pb-3">
            {project.description}
          </Card.Body>

          <Card.Body className="pt-0">
            <Row>
              <Col>
                <div className="text-muted small">Created</div>
                <div className="font-weight-bold">{moment(project.created).format('YYYY-MM-DD')}</div>
              </Col>
              <Col>
                <div className="text-muted small">Last Activity</div>
                <div className="font-weight-bold">{moment(project.lastActivity).format('YYYY-MM-DD')}</div>
              </Col>
            </Row>
          </Card.Body>
          <hr className="m-0" />

          <Card.Body className="py-3">
            <div className="text-muted small mb-2">Team</div>
            <div className="d-flex flex-wrap">
              {this.state.additionalData.team.map(member =>
                <a key={member.avatar} href="#d" onClick={this.prevent} className="d-block mr-1 mb-1">
                  <img src={`${process.env.PUBLIC_URL}/img/avatars/${member.avatar}`} alt="Team member" className="ui-w-30 rounded-circle" />
                </a>
              )}
            </div>
          </Card.Body>

        </Card>
      </Col>
    )
  }

  sortDynamic(a, b, sortBy, sortOrder) {
    const sortOrientation = sortOrder === 'ASC' ? 1 : -1

    if (sortBy === '') return 0
    if (a[sortBy] instanceof Date) {
      const secondsA = moment(a[sortBy]).valueOf()
      const secondsB = moment(b[sortBy]).valueOf()
      return (secondsA > secondsB) ? 1*sortOrientation : ((secondsB > secondsA) ? -1*sortOrientation : 0)
    } else if (isNaN(a[sortBy])) {
      return (a[sortBy].toString().localeCompare(b[sortBy]))*sortOrientation
    }
    return (a[sortBy] > b[sortBy]) ? 1*sortOrientation : ((b[sortBy] > a[sortBy]) ? -1*sortOrientation : 0)
  }

  render() {
    let projectsData = [...this.props.data]

    projectsData =  projectsData
      .sort((a, b) => this.sortDynamic(a, b, this.state.sortBy, this.state.sortOrder))
      .map((project) => 
        this.renderSingleProjectCard(project)
      );

    return (
      <div>

        <h4 className="d-flex justify-content-between align-items-center font-weight-bold">
          <div className="d-flex justify-content-end align-items-center w-100">
            <Col md={3} className="mb-2">
              <Form.Label>Sort order</Form.Label>
              <Form.Control as="select" className="custom-select" value={this.state.sortOrder} onChange={e => this.setState({ sortOrder: e.target.value })}>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </Form.Control>
            </Col>
            <Col md={3} className="mb-2">
              <Form.Label>Sort by</Form.Label>
              <Form.Control as="select" className="custom-select" value={this.state.sortBy} onChange={e => this.setState({ sortBy: e.target.value })}>
                <option value="">All</option>
                <option value="title">Name</option>
                <option value="riskScore">Risk</option>
                <option value="lastActivity">Last Activity</option>
                <option value="created">Created</option>
              </Form.Control>
            </Col>
          </div>
        </h4>

        <Row>
          {projectsData}
        </Row>

      </div>
    )
  }
}

export default ProjectsList
