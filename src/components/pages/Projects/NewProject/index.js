import React, { Component } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import moment from 'moment'
import FileUpload from '../../../../components/forms/FileUpload'
import '../../../../vendor/libs/react-datepicker/react-datepicker.scss'

const USERS_LIST = [
  { value: 'John Doe', label: 'John Doe' },
  { value: 'Trevor Virtue', label: 'Trevor Virtue' },
  { value: 'Daly Harry', label: 'Daly Harry' },
  { value: 'Peter Stanbridge', label: 'Peter Stanbridge' },
  { value: 'Andrew Kazantzis', label: 'Andrew Kazantzis' },
];

const APPLICATIONS_LIST = [
  { value: 'app1', label: 'Application 1' },
  { value: 'app2', label: 'Application 2' },
  { value: 'app3', label: 'Application 3' },
  { value: 'app4', label: 'Application 4' },
  { value: 'app5', label: 'Application 5' },
  { value: 'app6', label: 'Application 6' },
  { value: 'app7', label: 'Application 7' },
  { value: 'app8', label: 'Application 8' },
  { value: 'app9', label: 'Application 9' },
  { value: 'app10', label: 'Application 10' },
];

class NewProject extends Component {
  constructor(props) {
    super(props)
    props.setTitle('New Project')

    this.state = {

      startDate: new Date(),
      endDate: moment().add(5, 'days').toDate(),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Projects /</span> New
        </h4>

        <Card className="mb-4">
          <Card.Header as="h6">Project Info</Card.Header>
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md={4}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control placeholder="Project Name" />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label>Owner</Form.Label>
                  <Form.Control placeholder="Project Owner" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={12}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" placeholder="Project description" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={4}>
                  <Form.Label>Status</Form.Label>
                  <select className="custom-select">
                    <option>Select status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker className="form-control"
                    calendarClassName = "react-datepicker--with-time"
                    selected={this.state.startDate}
                    onChange={e => this.handleChange('startDate', e)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    todayButton={"Today"}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label>End date</Form.Label>
                  <DatePicker className="form-control"
                    calendarClassName = "react-datepicker--with-time"
                    selected={this.state.endDate}
                    onChange={e => this.handleChange('endDate', e)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    todayButton={"Today"}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={12}>
                  <Form.Label>Users</Form.Label>
                  <Select isMulti className="react-select" classNamePrefix="react-select"
                    options={USERS_LIST}
                    defaultValue={this.state.multiValue} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={12}>
                  <Form.Label>Applications</Form.Label>
                  <Select isMulti className="react-select" classNamePrefix="react-select"
                    options={APPLICATIONS_LIST}
                    defaultValue={this.state.multiValue} />
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3">
                <Form.Group as={Col} md={12}>
                  <FileUpload />
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3">
                <Form.Group as={Col} md={1}>
                  <Button type="submit" variant="primary">Submit</Button>
                </Form.Group>
                <Form.Group as={Col} md={1}>
                  <Button type="cancel" variant="danger">Cancel</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>

      </div>
    )
  }
}

export default NewProject
