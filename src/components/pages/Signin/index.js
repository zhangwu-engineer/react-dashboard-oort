import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import '../../../vendor/styles/pages/authentication.scss'

class Signin extends Component {
  constructor(props) {
    super(props)
    props.onSetTitle('Sign in')

    this.state = {
      credentials: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  }

  render() {
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
              <Form>
                <div className="d-flex justify-content-center align-items-center m-0">
                  <Button variant="primary" onClick={this.props.onLogin}>Sign In</Button>
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

export default Signin
