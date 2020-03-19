import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import '../../../vendor/styles/pages/authentication.scss'

class Signin extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Login v2 - Pages')

    this.state = {
      credentials: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  }

  onValueChange(field, e) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: field === 'rememberMe' ? e.target.checked : e.target.value
      }
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/1.jpg')` }}>
        <div className="ui-bg-overlay bg-dark opacity-25"></div>

        <div className="authentication-inner py-5">

          <Card>
            <div className="p-4 p-sm-5">
              {/* Logo */}
              <div className="d-flex justify-content-center align-items-center pb-2 mb-4">
                <div className="ui-w-60">
                  <div className="w-100 position-relative">
                    <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Brand" className="app-brand-logo ui-w-full" />
                  </div>
                </div>
              </div>
              {/* / Logo */}

              <h5 className="text-center text-muted font-weight-normal mb-4">Login to Your Account</h5>

              {/* Form */}
              <form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control value={this.state.credentials.email} onChange={e => this.onValueChange('email', e)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex justify-content-between align-items-end">
                    <div>Password</div>
                    <a href="#d" onClick={this.prevent} className="d-block small">Forgot password?</a>
                  </Form.Label>
                  <Form.Control type="password" value={this.state.credentials.password} onChange={e => this.onValueChange('password', e)} />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center m-0">
                  <Form.Check type="checkbox" custom checked={this.state.credentials.rememberMe} onChange={e => this.onValueChange('rememberMe', e)} label="Remember me" className="m-0" id="login-remember-me" />
                  <Button variant="primary">Sign In</Button>
                </div>
              </form>
              {/* / Form */}

            </div>
            <Card.Footer className="py-3 px-4 px-sm-5">
              <div className="text-center text-muted">
                Don't have an account yet? <a href="#d" onClick={this.prevent}>Sign Up</a>
              </div>
            </Card.Footer>
          </Card>

        </div>
      </div>
    )
  }
}

export default Signin
