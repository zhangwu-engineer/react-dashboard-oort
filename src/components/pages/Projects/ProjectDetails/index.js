import React, { Component } from 'react'
import { Breadcrumb, Button, Badge, Card, Tabs, Tab, Row, Col, Media, InputGroup, Form, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import Carousel from 'react-images'
import '../../../../vendor/styles/pages/projects.scss'

// react-images
const images2 = [
  { src: `${process.env.PUBLIC_URL}/img/bg/1.jpg` },
  { src: `${process.env.PUBLIC_URL}/img/bg/2.jpg` },
  { src: `${process.env.PUBLIC_URL}/img/bg/3.jpg` },
  { src: `${process.env.PUBLIC_URL}/img/bg/4.jpg` },
]

class ProjectsItem extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Project item - Pages')

    this.state = {
      projectPath: [
        { text: 'Projects' },
        { text: 'Website development', active: true }
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
        title: 'Frontend Development',
        status: 1,
        priority: 1,
        tasks: 44,
        completedTasks: 29,

        description: `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque magna augue, euismod at tortor et, laoreet maximus risus. Ut neque felis, luctus ut rhoncus id, elementum vitae lorem. Ut ac turpis sit amet lorem volutpat tincidunt. Vestibulum dui sapien, porttitor eget pellentesque id, ultrices id ipsum. Nam augue mi, maximus ut tortor et, fermentum efficitur diam. Suspendisse eget urna lorem. Fusce ligula augue, malesuada ullamcorper est nec, commodo laoreet tellus.</p>
  <p>Proin imperdiet purus et lectus luctus, rutrum fermentum lorem molestie. Nam urna felis, elementum elementum placerat id, fermentum ac urna. Etiam libero sem, porttitor ultrices efficitur condimentum, lobortis sit amet enim. Sed vitae orci nulla.</p>
  <p>Cras ultrices, dui id vulputate laoreet, diam orci semper ipsum, a aliquet nunc quam vitae turpis. Donec cursus tortor nec turpis semper, ac luctus mauris sagittis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
  <p>Aliquam ornare nisl semper nisl porttitor commodo vel vel libero. Pellentesque faucibus, nisl vel luctus porttitor, leo felis pellentesque augue, dignissim tempus risus odio sed lorem. Nunc nec malesuada nunc, ut mollis dui. Vestibulum ac lacinia massa. Phasellus eget purus nisi. Quisque sodales, tortor et elementum dapibus, nisl urna hendrerit metus, a rhoncus magna sem in libero. Aliquam mattis erat ut diam viverra, quis iaculis sem pulvinar. Vivamus ut mi vitae arcu finibus convallis. Nulla turpis lacus, tempor et sagittis non, egestas nec ante.</p>
  <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pharetra turpis non aliquet ornare. Duis euismod ultricies est sed auctor. Sed luctus accumsan enim ut efficitur.</p>
        `,

        created: '02/01/2018',
        lastUpdate: '02/18/2018',
        deadline: '03/12/2018',

        hourRate: 35,
        hours: 74,

        tags: ['Development', 'Frontend', 'Backend', 'Design'],

        createdBy: {
          name: 'Mae Gibson'
        },

        client: {
          name: 'Company Ltd.'
        },

        team: [
          { avatar: '2-small.png', name: 'Leon Wilson', role: 'Owner' },
          { avatar: '3-small.png', name: 'Allie Rodriguez', role: 'Read-Only' },
          { avatar: '4-small.png', name: 'Kenneth Frazier', role: 'Read-Only' },
          { avatar: '5-small.png', name: 'Nellie Maxwell', role: 'Read-Only' }
        ],

        activities: [{
          type: 'new_task',
          date: '2 hours',
          user: { avatar: '1-small.png', name: 'Mike Greene' },
          data: { taskTitle: 'Create invoice template' }
        }, {
          type: 'pushed_commit',
          date: '2 hours',
          user: { avatar: '2-small.png', name: 'Leon Wilson' },
          data: { commitId: 950458 }
        }, {
          type: 'pushed_commit',
          date: '2 hours',
          user: { avatar: '3-small.png', name: 'Allie Rodriguez' },
          data: { commitId: 950457 }
        }, {
          type: 'pushed_commit',
          date: '2 hours',
          user: { avatar: '5-small.png', name: 'Nellie Maxwell' },
          data: { commitId: 950456 }
        }, {
          type: 'completed_task',
          date: '2 hours',
          user: { avatar: '4-small.png', name: 'Kenneth Frazier' },
          data: { taskTitle: 'Google AdWords campain graphics' }
        }, {
          type: 'pushed_commit',
          date: '2 hours',
          user: { avatar: '4-small.png', name: 'Kenneth Frazier' },
          data: { commitId: 950455 }
        }, {
          type: 'new_task',
          date: '2 hours',
          user: { avatar: '5-small.png', name: 'Nellie Maxwell' },
          data: { taskTitle: 'Edit the draft for the icons' }
        }, {
          type: 'new_participant',
          date: '2 hours',
          user: { avatar: '1-small.png', name: 'Mike Greene' },
          data: { userName: 'Nellie Maxwell' }
        }]
      }
    }
  }

  priorityDropdownVariant (priority) {
    let variant

    if (priority === 1) variant = 'danger'
    if (priority === 2) variant = 'success'
    if (priority === 3) variant = 'warning'

    return `${variant} btn-xs md-btn-flat`
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl'

    return (
      <div>
        <Row>
          <Col>
            <h4 className="py-3 mb-4">
              <Breadcrumb className="font-weight-bold m-0" listProps={{ className: 'm-0' }}>
                {this.state.projectPath.map((item, i) =>
                  <Breadcrumb.Item active={(this.state.projectPath.length - 1) === i} key={item.text}>{item.text}</Breadcrumb.Item>
                )}
              </Breadcrumb>
            </h4>
          </Col>
          <Col md={4} xl={3}>
            <h5 className="py-3 mb-4 t-align-right">
              <Badge variant={`outline-primary font-weight-normal px-3 py-2`}>Completed</Badge>
            </h5>
          </Col>
        </Row>

        <Row>
          <Col>

            {/* Project Image */}
            <Card className="mb-4">
              <Card.Header as="h6">Project Image</Card.Header>
              <Card.Body>
                <Carousel views={images2} currentIndex={this.state.photoIndex2} />
              </Card.Body>
            </Card>
            {/* / Project Image */}

            {/* Description */}
            <Card className="mb-4">
              <Card.Header as="h6">Description</Card.Header>
              <Card.Body dangerouslySetInnerHTML={{ __html: this.state.projectData.description }}></Card.Body>
            </Card>
            {/* / Description */}

            {/* Tabs */}
            <div className="nav-tabs-top mb-4">
              <Tabs defaultActiveKey="users">
                <Tab eventKey="users" title="Users">
                  <Card.Body>
                      {this.state.projectData.team.map(member =>
                          <Media className="align-items-center pb-3">
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
                </Tab>
                <Tab eventKey="activity" title="Activity">
                  <Card.Body>

                    {this.state.projectData.activities.map(activity =>
                      <Media key={`${activity.type}${activity.date}${activity.user.name}`} className="pb-1 mb-3">
                        <div className="ui-feed-icon-container">
                          {activity.type === 'new_task' && <span className="ui-icon ui-feed-icon ion ion-md-add bg-primary text-white" />}
                          {activity.type === 'pushed_commit' && <span className="ui-icon ui-feed-icon ion ion-md-code bg-warning text-body" />}
                          {activity.type === 'completed_task' && <span className="ui-icon ui-feed-icon ion ion-md-checkmark bg-success text-white" />}
                          {activity.type === 'new_participant' && <span className="ui-icon ui-feed-icon ion ion-md-contact bg-info text-white" />}

                          <img src={`${process.env.PUBLIC_URL}/img/avatars/${activity.user.avatar}`} className="ui-w-40 rounded-circle" alt="User" />
                        </div>
                        <Media.Body className="align-self-center ml-3">
                          {activity.type === 'new_task' && <div><a href="#d" onClick={this.prevent}>{activity.user.name}</a> added new task <strong>{activity.data.taskTitle}</strong></div>}
                          {activity.type === 'pushed_commit' && <div><a href="#d" onClick={this.prevent}>{activity.user.name}</a> pushed commit <strong>#{activity.data.commitId}</strong></div>}
                          {activity.type === 'completed_task' && <div><a href="#d" onClick={this.prevent}>{activity.user.name}</a> completed task <strong>{activity.data.taskTitle}</strong></div>}
                          {activity.type === 'new_participant' && <div><a href="#d" onClick={this.prevent}>{activity.user.name}</a> assigned new participant <a href="#d" onClick={this.prevent}><strong>{activity.data.userName}</strong></a></div>}

                          <div className="text-muted small">{activity.date} ago</div>
                        </Media.Body>
                      </Media>
                    )}

                  </Card.Body>
                </Tab>
              </Tabs>
              {/* / Tabs */}
            </div>

          </Col>
          <Col md={4} xl={3}>

            {/* Project details */}
            <Card className="mb-4">
              <Card.Header as="h6">Project details</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Client</div>
                  <div><a href="#d" onClick={this.prevent}>{this.state.projectData.client.name}</a></div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Created by</div>
                  <div><a href="#d" onClick={this.prevent}>{this.state.projectData.createdBy.name}</a></div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Created at</div>
                  <div>{this.state.projectData.created}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Last update</div>
                  <div>{this.state.projectData.lastUpdate}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Deadline</div>
                  <div><strong>{this.state.projectData.deadline}</strong></div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Priority</div>
                  <DropdownButton
                    variant={this.priorityDropdownVariant(this.state.projectData.priority)}
                    title={<React.Fragment>
                      {this.state.projectData.priority === 1 && <span>High</span>}
                      {this.state.projectData.priority === 2 && <span>Medium</span>}
                      {this.state.projectData.priority === 3 && <span>Low</span>}
                    </React.Fragment>}
                    alignRight={!isRTL}
                    key={this.state.projectData.priority}
                  >
                    <Dropdown.Item active={this.state.projectData.priority === 1 ? 'true' : undefined}>High</Dropdown.Item>
                    <Dropdown.Item active={this.state.projectData.priority === 2 ? 'true' : undefined}>Medium</Dropdown.Item>
                    <Dropdown.Item active={this.state.projectData.priority === 3 ? 'true' : undefined}>Low</Dropdown.Item>
                  </DropdownButton>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Hour rate</div>
                  <div>${this.state.projectData.hourRate}/h</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Total hours</div>
                  <div>{this.state.projectData.hours}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Total cost</div>
                  <div><strong>${this.state.projectData.hourRate * this.state.projectData.hours}</strong></div>
                </ListGroup.Item>
                {this.state.projectData.tags && this.state.projectData.tags.length && <ListGroup.Item>
                  <div className="text-muted small">Tags</div>
                  <div className="d-flex flex-wrap">
                    {this.state.projectData.tags.map(tag =>
                      <Badge key={tag} variant="default" className="mt-1 mr-1">{tag}</Badge>
                    )}
                  </div>
                </ListGroup.Item>}
              </ListGroup>
            </Card>
            {/* / Project details */}

          </Col>
        </Row>

      </div>
    )
  }
}

export default ProjectsItem
