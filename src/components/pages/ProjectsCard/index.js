import React, { Component } from 'react'
import moment from 'moment'
import { Card, ProgressBar, Row, Col, Badge, DropdownButton, Dropdown } from 'react-bootstrap'
import { STATUSES } from '../../../shared/constants/projects'

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Projects List - Pages')

    this.state = {
      statuses: {
        1: { title: 'Active', color: 'success' },
        2: { title: 'Pending', color: 'warning' }
      },
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
    const imageUrl = `${process.env.PUBLIC_URL}/img/${project.imageUrl ? project.imageUrl : 'project.png'}`
    const iconName = project.status ? `${STATUSES[project.status].icon}` : 'default'
    const statusLabel = project.status ? STATUSES[project.status].label : 'N/A'
    const users = project.users ? project.users : 0
    const resources = project.resources ? project.resources : 0
    const riskScore = project.riskScore ? project.riskScore : 0

    return (
      <Col sm={6} xl={4} key={project.title}>
        <Card className="mb-4">
          <Card.Body className="d-flex justify-content-between align-items-start pb-3">
            <div className="d-flex align-items-center pb-3">
              <div>
                <img src={imageUrl} alt="Project Logo" className="ui-h-40 ui-bordered mr-3" />
              </div>
              <div>
                <a href="#d" onClick={this.prevent} className="text-body text-big font-weight-semibold">{project.name}</a>
                <Badge className="align-text-bottom ml-2" variant={iconName}>{statusLabel}</Badge>
                <div className="text-muted small mt-1">{users} users, {resources} resources</div>
              </div>
            </div>
            <DropdownButton variant="default icon-btn borderless rounded-pill md-btn-flat hide-arrow" size="sm" title={<i className="ion ion-ios-more"></i>} alignRight={!isRTL}>
              <Dropdown.Item>View</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Suspend</Dropdown.Item>
            </DropdownButton>
          </Card.Body>

          <ProgressBar now={riskScore} className="rounded-0" style={{ height: '3px' }} />
          <div className="card-body small pt-2 pb-0">
            <strong>{riskScore}%</strong> risk
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

 

  render() {
    const { data } = this.props
    const projectsData = data.map((project) => 
      this.renderSingleProjectCard(project)
    );

    return (
      <Row>
        {projectsData}
      </Row>
    )
  }
}

export default ProjectsList
