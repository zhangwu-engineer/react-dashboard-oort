import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import '../../../vendor/styles/pages/authentication.scss'
import OktaAuth from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';

class SigninForm extends Component {
  constructor(props) {
    super(props)
    props.onSetTitle('Sign in')

    this.state = {
      email: '',
      password: '',
    }

    this.oktaAuth = new OktaAuth({ issuer: props.issuer });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.email,
      password: this.state.password
    })
    .then(res => {
      this.setState({
        sessionToken: res.sessionToken
      })
      localStorage.setItem('sessionToken', res.sessionToken)
    })
    .catch(err => console.log('Found an error', err));
  }

  render() {
    if (this.state.sessionToken) {
      this.props.authService.redirect({sessionToken: this.state.sessionToken});
      return null;
    }

    return (
      <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/1.jpg')` }}>
        <div className="ui-bg-overlay bg-dark opacity-25"></div>

        <div className="authentication-inner py-5">

          <Card>
            <div className="p-4 p-sm-5">
              {/* Logo */}
              <div className="d-flex justify-content-center align-items-center pb-2 mb-2">
                <div className="ui-w-60">
                  <div className="w-100 position-relative">
                    <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Brand" className="app-brand-logo ui-w-full" />
                  </div>
                </div>
              </div>
              {/* / Logo */}

              <h5 className="text-center text-muted font-weight-normal mb-4">Login to Your Account</h5>

              {/* Form */}
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control value={this.state.email} onChange={e => this.onValueChange('email', e)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={this.state.password} onChange={e => this.onValueChange('password', e)} />
                </Form.Group>
                <Form>
                  <div className="d-flex justify-content-center align-items-center m-0">
                    <Button variant="primary" onClick={this.handleSubmit}>Sign In</Button>
                  </div>
                </Form>
              {/* / Form */}
            </div>
          </Card>

        </div>
      </div>
    )
  }
}

export default withOktaAuth(SigninForm)
