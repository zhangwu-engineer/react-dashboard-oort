import React, { Component } from 'react'
import moment from 'moment'
import { Button, Card, ProgressBar, Form, Row, Col, Badge, DropdownButton, Dropdown } from 'react-bootstrap'

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

      projectsData: [{
        status: 1,
        title: 'Frontend Development',
        imageUrl: 'project.png',
        users: 5,
        resources: 5,
        riskScore: 56,
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac malesuada nisl. Maecenas quis ultrices tellus.',
        created: new Date('2018-01-04'),
        lastActivity: new Date('2018-04-04'),
        team: [
          { avatar: '2-small.png' },
          { avatar: '3-small.png' },
          { avatar: '4-small.png' },
          { avatar: '5-small.png' },
          { avatar: '6-small.png' }
        ]
      }, {
        status: 1,
        title: 'Website',
        imageUrl: 'project.png',
        users: 3,
        resources: 29,
        riskScore: 32,
        shortDescription: 'Aliquam sem elit, semper sed ante ut, aliquam molestie risus.',
        created: new Date('2018-02-24'),
        lastActivity: new Date('2018-02-28'),
        team: [
          { avatar: '7-small.png' },
          { avatar: '8-small.png' },
          { avatar: '9-small.png' }
        ]
      }, {
        status: 1,
        title: 'UI update',
        imageUrl: 'project.png',
        users: 3,
        resources: 48,
        riskScore: 77,
        shortDescription: 'Etiam venenatis varius lectus sed fermentum. Nullam hendrerit, massa sed tincidunt sagittis, leo nibh semper sapien, vitae interdum nisl erat ut sapien.',
        created: new Date('2018-03-04'),
        lastActivity: new Date('2018-03-14'),
        team: [
          { avatar: '10-small.png' },
          { avatar: '11-small.png' },
          { avatar: '12-small.png' }
        ]
      }, {
        status: 2,
        title: 'SEO',
        imageUrl: 'project.png',
        users: 3,
        resources: 45,
        riskScore: 77,
        shortDescription: 'Suspendisse scelerisque nisi ac semper ornare.',
        created: new Date('2018-02-04'),
        lastActivity: new Date('2018-02-05'),
        team: [
          { avatar: '2-small.png' },
          { avatar: '3-small.png' },
          { avatar: '4-small.png' }
        ]
      }, {
        status: 1,
        title: 'example.com design',
        imageUrl: 'project.png',
        users: 4,
        resources: 28,
        riskScore: 88,
        shortDescription: 'Pellentesque imperdiet nunc quis fringilla euismod. Nunc iaculis eu augue sit amet faucibus.',
        created: new Date('2018-01-14'),
        lastActivity: new Date('2018-04-14'),
        team: [
          { avatar: '5-small.png' },
          { avatar: '6-small.png' },
          { avatar: '7-small.png' },
          { avatar: '8-small.png' }
        ]
      }]
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
                <Badge variant={this.state.statuses[project.status].color} className="align-text-bottom ml-1">{this.state.statuses[project.status].title}</Badge>
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
            {project.shortDescription}
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
              {project.team.map(member =>
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
    let projectsData = [...this.state.projectsData]

    projectsData =  projectsData
      .sort((a, b) => this.sortDynamic(a, b, this.state.sortBy, this.state.sortOrder))
      .map((project) => 
        this.renderSingleProjectCard(project)
      );

    return (
      <div>

        <h4 className="d-flex justify-content-between align-items-center font-weight-bold py-3 mb-4">
          <div>Projects</div>
          <div className="d-flex justify-content-end align-items-center w-100">
            <Col md={3} className="mb-4">
              <Form.Label>Sort order</Form.Label>
              <Form.Control as="select" className="custom-select" value={this.state.sortOrder} onChange={e => this.setState({ sortOrder: e.target.value })}>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </Form.Control>
            </Col>
            <Col md={3} className="mb-4">
              <Form.Label>Sort by</Form.Label>
              <Form.Control as="select" className="custom-select" value={this.state.sortBy} onChange={e => this.setState({ sortBy: e.target.value })}>
                <option value="">All</option>
                <option value="title">Name</option>
                <option value="riskScore">Risk</option>
                <option value="lastActivity">Last Activity</option>
                <option value="created">Created</option>
              </Form.Control>
            </Col>
            <Button variant="primary rounded-pill" className="d-block"><span className="ion ion-md-add"></span>&nbsp; Create project</Button>
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
