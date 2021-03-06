import React, { Component } from 'react'
import layoutHelpers from '../../shared/layouts/helpers'

class WithoutNavbarExample extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Without navbar - Layouts')
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="font-weight-bold align-middle"><span className="text-muted font-weight-light">Layouts /</span> Without navbar</span>
          <a href="#d" onClick={this.toggleSidenav} className="text-muted align-middle ml-3" style={{fontSize: '14px'}}><i className="ion ion-md-menu text-large align-middle"></i></a>
        </h4>

        <div className="layout-example-block layout-example-block-1">
          <code>.layout-wrapper.layout-1</code>

          <div className="layout-example-block">
            <code>.layout-inner</code>

            <div className="layout-example-block layout-example-block-container">
              <code>.layout-container</code>

              <div className="layout-example-block-inner">

                <div className="layout-example-block layout-example-block-sidenav">
                  <code>.layout-sidenav</code>
                </div>

                <div className="layout-example-block layout-example-block-content">
                  <code>.layout-content</code>

                  <div className="layout-example-block bg-white">
                    <code className="text-body">.container-fluid</code>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default WithoutNavbarExample
