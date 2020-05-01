import React, { Component } from 'react'
import { Breadcrumb, Form, Button, Col, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import moment from 'moment'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
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
      projectPath: [
        { text: 'Projects', url: '/projects' },
        { text: 'New', active: true }
      ],
      projectData: {
        users: [],
        apps: [],
        startDate: new Date(),
        endDate: moment().add(5, 'days').toDate(),
      }
    }

    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
    this.handleChangeUserOptions = this.handleChangeUserOptions.bind(this)
    this.handleChangeAppOptions = this.handleChangeAppOptions.bind(this)

  }
  
  handleChangeStart(startDate) {
    this.setDates({ startDate })
  }

  handleChangeEnd(endDate) {
    this.setDates({ endDate })
  }

  setDates({ startDate = this.state.projectData.startDate, endDate = this.state.projectData.endDate }) {
    if (moment(startDate).isAfter(endDate)) {
      endDate = startDate
    }

    this.setState(state => {
      state.projectData.startDate = startDate
      state.projectData.endDate = endDate
      return state
    })
  }

  handleChangeUserOptions(users) {
    this.setState(state => {
      state.projectData.users = users
      return state
    })
  }

  handleChangeAppOptions(apps) {
    this.setState(state => {
      state.projectData.apps = apps
      return state
    })
  }

  render() {
    return (
      <div>
        <Col>
          <h4 className="py-3 mb-4">
            <Breadcrumb className="font-weight-bold m-0" listProps={{ className: 'm-0' }}>
              {this.state.projectPath.map((item, i) =>
                <Breadcrumb.Item active={(this.state.projectPath.length - 1) === i} key={item.text} href={item.url}>{item.text}</Breadcrumb.Item>
              )}
            </Breadcrumb>
          </h4>
        </Col>

        <Card className="mb-4">
          <Card.Header as="h6">Project Info</Card.Header>
          <Card.Body>
            {/* Form */}
            <Formik
              initialValues={{
                name: "",
                owner: "",
                status: "",
                description: ""
              }}
              validate={values => {
                let errors = {};
                if (values.name === "") {
                  errors.name = "Name is required";
                } else if (values.name.length < 3) {
                  errors.name = "Name must be 3 characters at minimum";
                }
                if (values.owner === "") {
                  errors.owner = "Owner is required";
                } else if (values.name.length < 3) {
                  errors.owner = "Owner must be 3 characters at minimum";
                }
                if (values.status === "") {
                  errors.status = "Status is required";
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                console.log('form submitted!', { ...values, ...this.state.projectData})
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <FormikForm>
                  <Form.Row>
                    <Form.Group as={Col} md={4}>
                      <Form.Label>Name</Form.Label>
                      <Field
                        name="name"
                        placeholder="Project Name"
                        className={`form-control ${
                          touched.name && errors.name ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="name"
                        className="invalid-feedback"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                      <Form.Label>Owner</Form.Label>
                      <Field
                        name="owner"
                        placeholder="Project Owner"
                        className={`form-control ${
                          touched.owner && errors.owner ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="owner"
                        className="invalid-feedback"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md={12}>
                      <Form.Label>Description</Form.Label>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Project Owner"
                        className="form-control"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md={4}>
                      <Form.Label>Status</Form.Label>
                      <Field
                        as="select"
                        name="status"
                        className={`custom-select ${
                          touched.status && errors.status ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </Field>
                      {errors.status &&
                        <div className="d-block invalid-feedback">
                          {errors.status}
                        </div>
                      }
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                      <Form.Label>Start Date</Form.Label>
                      <DatePicker className="form-control"
                        calendarClassName = "react-datepicker--with-time"
                        selected={this.state.projectData.startDate}
                        onChange={this.handleChangeStart}
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
                        selected={this.state.projectData.endDate}
                        onChange={this.handleChangeEnd}
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
                        defaultValue={this.state.projectData.users}
                        onChange={this.handleChangeUserOptions}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md={12}>
                      <Form.Label>Applications</Form.Label>
                      <Select isMulti className="react-select" classNamePrefix="react-select"
                        options={APPLICATIONS_LIST}
                        defaultValue={this.state.projectData.apps}
                        onChange={this.handleChangeAppOptions}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Form.Group as={Col} md={12}>
                      <Button type="submit" variant="primary">Submit</Button>
                      <Button type="cancel" variant="danger ml-2">Cancel</Button>
                    </Form.Group>
                  </Form.Row>
                </FormikForm>
              )}
            </Formik>
            {/* / Form */}
          </Card.Body>
        </Card>

      </div>
    )
  }
}

export default NewProject
