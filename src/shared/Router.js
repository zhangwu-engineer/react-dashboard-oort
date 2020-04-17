import React, { Component } from 'react'
import { BrowserRouter as AppRouter } from 'react-router-dom'
import AppWithRouterAccess from './AppWithRouterAccess';

class Router extends Component {
  render() {
    return (
      <AppRouter basename={process.env.REACT_APP_BASENAME}>
        <AppWithRouterAccess />
      </AppRouter>
    )
  }
}

export default Router
