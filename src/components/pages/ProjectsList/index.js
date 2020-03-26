import React, { Component } from 'react'
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

      projectsData: [{
        status: 1,
        title: 'Frontend Development',
        imageUrl: 'project.png',
        users: 5,
        resources: 5,
        riskScore: 56,
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac malesuada nisl. Maecenas quis ultrices tellus.',
        created: '02/01/2018',
        lastActivity: '03/12/2018',
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
        created: '02/01/2018',
        lastActivity: '03/12/2018',
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
        created: '02/01/2018',
        lastActivity: '03/12/2018',
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
        created: '02/01/2018',
        lastActivity: '03/12/2018',
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
        created: '02/01/2018',
        lastActivity: '03/12/2018',
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
                <div className="font-weight-bold">{project.created}</div>
              </Col>
              <Col>
                <div className="text-muted small">Last Activity</div>
                <div className="font-weight-bold">{project.lastActivity}</div>
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

  render() {
    let projectsData = [...this.state.projectsData]

    projectsData =  projectsData
      .sort((a, b) => {
        const { sortBy } = this.state
        if (sortBy === '') return false
        if (isNaN(a[sortBy])) return a[sortBy].localeCompare(b[sortBy])
        return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0)
      })
      .map((project) => 
        this.renderSingleProjectCard(project)
      );

    return (
      <div>

        <h4 className="d-flex justify-content-between align-items-center font-weight-bold py-3 mb-4">
          <div>Projects</div>
          <div className="d-flex justify-content-end align-items-center w-100">
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
