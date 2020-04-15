import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import SigninForm from './SigninForm';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Signin extends Component {
  render() {
    if (this.props.authState.isPending) { 
      return (
        <div className="layout-inner d-flex justify-content-center align-items-center pb-2 mb-2">
          <div className="ui-w-60">
            <div className="w-100 position-relative">
              <Spinner animation="border" size="ls" variant="primary" />
            </div>
          </div>
        </div>
      );
    }
    return this.props.authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <SigninForm issuer={this.props.issuer} onSetTitle={this.props.setTitle} />;
  }
});