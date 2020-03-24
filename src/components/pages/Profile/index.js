import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { Card, Row, Col, Media, Button } from 'react-bootstrap'

class Profile extends Component {

  constructor(props) {
    super(props)
    props.setTitle('My Profile')

    this.state = {
      userInfo: null
    }
  }

  async componentDidMount() {
    await this.props.authService.getUser().then((userInfo) => {
      this.setState({ userInfo });
    });
  }

  render() {

    const { userInfo } = this.state

    if (!userInfo) {
      return (
        <div>
          <p>Fetching user profile...</p>
        </div>
      );
    }

    return (
      <div>
  
        {/* Header */}
        <div className="container-m-nx container-m-ny bg-white mb-4">
          <Media as={Col} md={10} lg={8} xl={7} className="py-5 mx-auto">
            <img src={`${process.env.PUBLIC_URL}/img/avatars/1.png`} alt="User" className="d-block ui-w-100 rounded-circle" />
            <Media.Body className="ml-5">
              <h4 className="font-weight-bold mb-4">{userInfo.name}</h4>
              <div className="text-muted mb-4">
                Lorem ipsum dolor sit amet, nibh suavitate qualisque ut nam. Ad harum primis electram duo, porro principes ei has.
              </div>
            </Media.Body>
          </Media>
          <hr className="m-0" />
        </div>
        {/* Header */}
  
        <Row>
          <Col>
  
            {/* Info */}
            <Card className="mb-4">
              <Card.Body>
  
                <Row className="mb-2">
                  <Col md={3} className="text-muted">Given Name:</Col>
                  <Col md={9}>
                    {userInfo.given_name}
                  </Col>
                </Row>
  
                <Row className="mb-2">
                  <Col md={3} className="text-muted">Family Name:</Col>
                  <Col md={9}>
                    {userInfo.family_name}
                  </Col>
                </Row>
  
              </Card.Body>
            </Card>
            {/* / Info */}
  
          </Col>
          <Col xl={4}>
  
            {/* Side info */}
            <Card className="mb-4">
              <Card.Body>
                <Button variant="primary rounded-pill">+&nbsp; Follow</Button>
              </Card.Body>
              <hr className="border-light m-0" />
              <Card.Body>
                <p className="mb-2">
                  <i className="ion ion-md-mail ui-w-30 text-center text-lighter"></i> {userInfo.email}</p>
                <p className="mb-2">
                  <i className="ion ion-ios-navigate ui-w-30 text-center text-lighter"></i> {userInfo.zoneinfo}</p>
              </Card.Body>
            </Card>
            {/* / Side info */}
  
          </Col>
        </Row>
  
      </div>
    )
  }
  
};

export default withOktaAuth(Profile);
