import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';

import config from './config';
import Signin from '../components/pages/Signin';

// Routes
import { DefaultLayout, titleTemplate, routes } from '../routes'
import {withOktaAuth} from "@okta/okta-react";

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props)

    // Set default layout
    this.routes = routes.map(route => {
      route.layout = route.layout || DefaultLayout
      route.exact = typeof route.exact === 'undefined' ? true : route.exact
      return route
    })

    // Set app loading class
    document.documentElement.classList.add('app-loading')

    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  componentDidMount() {
    const removeLoadingClass = () => {
      document.documentElement.classList.remove('app-loading')
    }

    // Remove splash screen
    const splashScreen = document.querySelector('.app-splash-screen')
    if (splashScreen) {
      splashScreen.style.opacity = 0
      setTimeout(() => {
        splashScreen && splashScreen.parentNode.removeChild(splashScreen)
        removeLoadingClass()
      }, 300)
    } else {
      removeLoadingClass()
    }
  }

  setTitle(title) {
    document.title = titleTemplate.replace('%s', title)
  }

  scrollTop(to, duration, element = document.scrollingElement || document.documentElement) {
    if (element.scrollTop === to) return
    const start = element.scrollTop
    const change = to - start
    const startDate = +new Date()

    if (!duration) {
      element.scrollTop = to
      return
    }

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    const animateScroll = () => {
      const currentDate = +new Date()
      const currentTime = currentDate - startDate
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll)
      } else {
        element.scrollTop = to
      }
    }

    animateScroll()
  }
  
  onAuthRequired() { 
    this.props.history.push('/signin');
  }

  render() {
    return (
      <Security
        issuer={config.ISSUER}
        clientId={config.CLIENT_ID}
        redirectUri={window.location.origin + '/implicit/callback'}
        onAuthRequired={this.onAuthRequired}
        pkce={true}
      >
        {this.routes.map(route => (
          <SecureRoute
            path={route.path}
            exact={route.exact}
            component={withOktaAuth(props => {
              // On small screens collapse sidenav
              if (window.layoutHelpers && window.layoutHelpers.isSmallScreen()) {
                window.layoutHelpers.setCollapsed(true, false)
              }

              if (props.authState.isAuthenticated) {
                // Update the access token cookie whenever navigating to a page while authorized
                // This token is used by the dataplane to identify the user
                document.cookie = `oort_token=${props.authState.accessToken}; domain=${config.OORT_TOKEN_DOMAIN}`
              }

              // Scroll page to top on route render
              this.scrollTop(0, 0)

              // Return layout
              return <route.layout location={{ pathname: route.path }} {...props}>
                <route.component {...props} setTitle={this.setTitle} scrollTop={this.scrollTop} />
              </route.layout>
            })}
            key={route.path}
          />
        ))}
        <Route path='/signin' render={() => <Signin issuer={config.ISSUER} setTitle={this.setTitle} />} />
        <Route path='/implicit/callback' component={LoginCallback} />
      </Security>
    );
  }
});