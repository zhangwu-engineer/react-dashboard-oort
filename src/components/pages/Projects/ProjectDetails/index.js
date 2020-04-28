import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Button, Badge, Card, Row, Col, Media, ProgressBar, ListGroup } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import '../../../../vendor/styles/pages/projects.scss'
import '../../../../vendor/libs/react-datepicker/react-datepicker.scss'
import { getProject } from "../../../../store/actions/projects"
import ActivityLogs from "../../ActivityLogs"
// react-datepicker custom input

class DateInput extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.value}
      </div>
    )
  }
}

class ProjectDetails extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Project item - Pages')

    this.state = {
      projectPath: [
        { text: 'Projects', url: '/projects' },
        { text: 'Example Inc', active: true }
      ],

      statuses: {
        1: { title: 'Active', color: 'success' },
        2: { title: 'Pending', color: 'warning' }
      },

      // Tags
      taskTags: {
        clients: { title: 'Clients', color: 'success' },
        important: { title: 'Important', color: 'danger' },
        social: { title: 'Social', color: 'info' },
        other: { title: 'Other', color: 'warning' }
      },

      projectData: {
        title: 'Example Inc',
        status: 1,
        priority: 1,
        tasks: 44,
        completedTasks: 29,
        imageUrl: `${process.env.PUBLIC_URL}/img/mock/project.png`,
        description: `Read-only access to Example Inc`,
        createdAt: new Date('02/01/2018'),
        lastUpdate: new Date('02/18/2018'),
        startDate: '03/12/2018 08:00 am',
        endDate: '04/12/2018 09:00 pm',

        createdBy: {
          name: 'Mae Gibson'
        },

        risk: {
          score: 66,
          description: 'Lack of information'
        },

        team: [
          { avatar: '2-small.png', name: 'Leon Wilson', role: 'Owner' },
          { avatar: '3-small.png', name: 'Allie Rodriguez', role: 'Read-Only' },
          { avatar: '4-small.png', name: 'Kenneth Frazier', role: 'Read-Only' },
          { avatar: '5-small.png', name: 'Nellie Maxwell', role: 'Read-Only' }
        ],

        resources: [
          { avatar: 'uikit/adidas.jpg', name: 'Company Directory' },
          { avatar: 'uikit/headphones.jpg', name: 'HR Management System' },
        ],
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.props.getProject(this.props.match.params.id)
  }

  prevent(e) {
    e.preventDefault()
  }

  handleChange(field, value) {
    this.setState({ projectData: {
      ...this.state.projectData,
      [field]: value
    }})
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h4 className="py-3 mb-4">
              <Breadcrumb className="font-weight-bold m-0" listProps={{ className: 'm-0' }}>
                {this.state.projectPath.map((item, i) =>
                  <Breadcrumb.Item active={(this.state.projectPath.length - 1) === i} key={item.text} href={item.url}>{item.text}</Breadcrumb.Item>
                )}
              </Breadcrumb>
            </h4>
          </Col>
          <Col md={4} xl={3}>
            <h5 className="py-3 mb-4 t-align-right">
              <Badge variant={`outline-primary font-weight-normal px-3 py-2`}>{this.state.statuses[this.state.projectData.status].title}</Badge>
            </h5>
          </Col>
        </Row>

        <Row>
          <Col md={4} xl={3}>

            {/* Project details */}
            <Card className="mb-4">
              <Card.Header as="h6">Project details</Card.Header>
              <ListGroup variant="flush">
                <img src={`https://ui-avatars.com/api/?name=${this.state.projectData.title}`} alt="Project Logo" className="py-3 mx-auto" />
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div>{this.state.projectData.description}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Name</div>
                  <div><a href="#d" onClick={this.prevent}>{this.state.projectData.title}</a></div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Owner</div>
                  <div><a href="#d" onClick={this.prevent}>{this.state.projectData.createdBy.name}</a></div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Created at</div>
                  <div>
                    <DatePicker
                      customInput={<DateInput />}
                      selected={this.state.projectData.createdAt}
                      onChange={date => this.handleChange('createdAt', date)}
                      popperPlacement={this.placement}
                    />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Modified at</div>
                  <div>
                    <DatePicker
                      customInput={<DateInput />}
                      selected={this.state.projectData.lastUpdate}
                      onChange={date => this.handleChange('lastUpdate', date)}
                      popperPlacement={this.placement}
                    />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Start Date</div>
                  <div>{this.state.projectData.startDate}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">End Date</div>
                  <div>{this.state.projectData.endDate}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Status</div>
                  <Badge variant={`outline-primary font-weight-normal px-3 py-2`}>{this.state.statuses[this.state.projectData.status].title}</Badge>
                </ListGroup.Item> 
                <ListGroup.Item>
                  <div className="mt-2 mb-3">
                    <ProgressBar now={this.state.projectData.risk.score} style={{ height: '4px' }} />           
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="text-muted">Risk Score</div>
                    <div>{this.state.projectData.risk.score}%</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="text-muted"></div>
                    <div>{this.state.projectData.risk.description}</div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {/* / Project details */}

          </Col>
          <Col>
            <Card className="mb-4">
              <Card.Header as="h6">Users</Card.Header>
              <Card.Body>
                  {this.state.projectData.team.map((member, index) =>
                      <Media className="align-items-center pb-3" key={index}>
                        <img src={`${process.env.PUBLIC_URL}/img/avatars/${member.avatar}`} className="d-block ui-w-40 rounded-circle" alt="Member" />
                        <Media.Body className="px-3 layout-wrapper">
                          <a href="#d" onClick={this.prevent} className="text-body layout-content">{member.name}</a>
                          <div className="layout-content">
                            <Badge key={member} variant="outline-info" className="ui-w-fit mt-1">{member.role}</Badge>
                          </div>
                        </Media.Body>
                        <a href="#d" onClick={this.prevent} className="d-block text-light text-large font-weight-light">&times;</a>
                      </Media>
                  )}
              </Card.Body>
              <Card.Footer className="py-3">
                <Button variant="primary"><i className="ion ion-md-add"></i>&nbsp; Add user</Button>&nbsp;
                <Button variant="default md-btn-flat"><i className="ion ion-md-close"></i>&nbsp; Clear</Button>
              </Card.Footer>
            </Card>
            <Card className="mb-4">
              <Card.Header as="h6">Resources</Card.Header>
              <Card.Body>
                  {this.state.projectData.resources.map((resource, index) =>
                      <Media className="align-items-center pb-3" key={index}>
                        <img src={`https://ui-avatars.com/api/?name=${resource.name}`} className="d-block ui-w-40 rounded-circle" alt="Member" />
                        <Media.Body className="px-3 layout-wrapper">
                          <a href="#d" onClick={this.prevent} className="text-body layout-content">{resource.name}</a>
                        </Media.Body>
                        <a href="#d" onClick={this.prevent} className="d-block text-light text-large font-weight-light">&times;</a>
                      </Media>
                  )}
              </Card.Body>
              <Card.Footer className="py-3">
                <Button variant="primary"><i className="ion ion-md-add"></i>&nbsp; Add Application</Button>&nbsp;
                <Button variant="default md-btn-flat"><i className="ion ion-md-close"></i>&nbsp; Clear</Button>
              </Card.Footer>
            </Card>
            <Card className="mb-4">
              <Card.Header as="h6">Activity </Card.Header>
              <Card.Body>
                <ActivityLogs setTitle={() => {}} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: (id) => dispatch(getProject(id))
  };
}

const mapStateToProps = state => {
  return { project: state.projects.project };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectDetails))
