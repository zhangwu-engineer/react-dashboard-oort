import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import { compose } from 'redux'
import { withOktaAuth } from '@okta/okta-react'
import { withRouter } from 'react-router-dom'
import Signin from '../Signin'
import { titleTemplate, defaultRoute } from '../../../routes'

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userInfo: null
    }
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    await this.props.authService.getUser().then((userInfo) => {
      this.setState({ userInfo });
    });
  }

  async login() {
    this.props.authService.login('/');
  }

  render() {

    const { authState } = this.props
    const { userInfo } = this.state

    if (authState.isPending) {
      return (
        <div className="layout-inner d-flex justify-content-center align-items-center pb-2 mb-2">
          <div className="ui-w-60">
            <div className="w-100 position-relative">
              <Spinner animation="border" size="ls" variant="primary" />
            </div>
          </div>
        </div>
      )
    }
  
    if (authState.isAuthenticated && userInfo) {
      this.props.history.push(defaultRoute)
    }
  
    return (
      <div>
        { authState.isAuthenticated && !userInfo
        && (
          <div className="layout-inner d-flex justify-content-center align-items-center pb-2 mb-2">
            <div className="ui-w-60">
              <div className="w-100 position-relative">
                <Spinner animation="border" size="ls" variant="primary" />
              </div>
            </div>
          </div>
        )}
  
        {!authState.isAuthenticated
        && (
        <div>
          <Signin
            onLogin={this.login}
            onSetTitle={e => document.title = titleTemplate.replace('%s', e)}
          />
        </div>
        )}
      </div>
    )
  }

}

export default compose(withRouter, withOktaAuth)(Home)
