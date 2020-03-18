import React, { Component } from 'react'
import LayoutNavbar from './LayoutNavbar'
import LayoutSidenav from './LayoutSidenav'
import LayoutFooter from './LayoutFooter'
import layoutHelpers from './helpers'

class Layout2 extends Component {
  closeSidenav(e) {
    e.preventDefault()
    layoutHelpers.setCollapsed(true)
  }

  componentDidMount() {
    layoutHelpers.init()
    layoutHelpers.update()
    layoutHelpers.setAutoUpdate(true)
  }

  componentWillUnmount() {
    layoutHelpers.destroy()
  }

  render() {
    return (
      <div className="layout-wrapper layout-2">
        <div className="layout-inner">
          <LayoutSidenav {...this.props} />

          <div className="layout-container">
            <LayoutNavbar {...this.props} />

            <div className="layout-content">
              <div className="container-fluid flex-grow-1 container-p-y">
                {this.props.children}
              </div>

              <LayoutFooter {...this.props} />
            </div>
          </div>
        </div>
        <div className="layout-overlay" onClick={this.closeSidenav}></div>
      </div>
    )
  }
}

export default Layout2
