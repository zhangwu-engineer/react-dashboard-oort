import { useOktaAuth } from '@okta/okta-react'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { defaultRoute } from '../../../routes'
import Signin from '../Signin'
import { titleTemplate } from '../../../routes'

const Home = () => {
  const { authState, authService } = useOktaAuth()
  const [userInfo, setUserInfo] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null)
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, authService]) // Update if authState changes

  const login = async () => {
    authService.login('/')
  }

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
    history.push(defaultRoute)
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
          onLogin={login}
          onSetTitle={e => document.title = titleTemplate.replace('%s', e)}
        />
      </div>
      )}
    </div>
  )
}

export default Home
