import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SigninForm from './SigninForm';
import { withOktaAuth } from '@okta/okta-react';
import Loader from '../../../shared/Loader'

export default withOktaAuth(class Signin extends Component {
  render() {
    if (this.props.authState.isPending) { 
      return <Loader />;
    }
    return this.props.authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <SigninForm issuer={this.props.issuer} onSetTitle={this.props.setTitle} />;
  }
});