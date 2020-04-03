import React, { Component } from 'react'
import { Form, Button, Row, Col, InputGroup, Card } from 'react-bootstrap'

class NewProject extends Component {
  constructor(props) {
    super(props)
    props.setTitle('New Project')
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
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="text-sm-right">Name</Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Project Name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="text-sm-right">Owner</Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Project Owner" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="text-sm-right">Textarea</Form.Label>
                <Col sm={10}>
                  <Form.Control as="textarea" placeholder="Password" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="text-sm-right pt-0">Radios</Form.Label>
                <Col sm={10}>
                  <Form.Check defaultChecked custom type="radio" name="form-horizontal-radios-example" id="form-horizontal-radios-example-1"
                    label="Option one is this and that&mdash;be sure to include why it's great" />
                  <Form.Check custom type="radio" name="form-horizontal-radios-example" id="form-horizontal-radios-example-2"
                    label="Option two can be something else and selecting it will deselect option one" />
                  <Form.Check custom disabled type="radio" name="form-horizontal-radios-example" id="form-horizontal-radios-example-3"
                    label="Option three is disabled" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="text-sm-right pt-0">Checkbox</Form.Label>
                <Col sm={10}>
                  <Form.Check custom type="checkbox" name="form-horizontal-radios-example" id="form-horizontal-checkbox-example-1"
                    label="Check me out" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" variant="primary">Submit</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

      </div>
    )
  }
}

export default NewProject
