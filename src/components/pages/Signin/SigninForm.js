import React, { Component } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import '../../../vendor/styles/pages/authentication.scss'
import OktaAuth from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';
import { Form } from 'react-bootstrap'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';

class SigninForm extends Component {
  constructor(props) {
    super(props)
    props.onSetTitle('Sign in')

    this.state = {
    }

    this.oktaAuth = new OktaAuth({ issuer: props.issuer });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.authService.redirect({ sessionToken: this.state.sessionToken });
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
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={values => {
                  const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                  let errors = {};
                  if (values.email === "") {
                    errors.email = "Email is required";
                  } else if (!emailTest.test(values.email)) {
                    errors.email = "Invalid email address format";
                  }
                  if (values.password === "") {
                    errors.password = "Password is required";
                  } else if (values.password.length < 5) {
                    errors.password = "Password must be 5 characters at minimum";
                  }
                  return errors;
                }}
                onSubmit={(values, actions) => {
                  this.oktaAuth.signIn({
                    username: values.email,
                    password: values.password
                  })
                  .then(res => this.setState({
                    sessionToken: res.sessionToken
                  }))
                  .catch(err => actions.setFieldError('general', err.message))
                  .finally(() => actions.setSubmitting(false))
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <FormikForm>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className={`form-control ${
                          touched.password && errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </Form.Group>
                    {errors.general &&
                      <div className="text-danger">{errors.general}</div>
                    }
                    <Button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ?
                        <Spinner as="span" animation="border" role="status" aria-hidden="true" />
                        : "Sign in"
                      }
                    </Button>
                  </FormikForm>
                )}
              </Formik>
              {/* / Form */}
            </div>
          </Card>

        </div>
      </div>
    )
  }
}

export default withOktaAuth(SigninForm)
