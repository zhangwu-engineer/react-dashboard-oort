import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { defaultRoute } from '../../../routes';

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login('/');
  };

  if (authState.isPending) {
    return (
      <div>Loading...</div>
    );
  }

  if (authState.isAuthenticated && userInfo) {
    history.push(defaultRoute);
  }

  return (
    <div>
      { authState.isAuthenticated && !userInfo
      && <div>Loading user information...</div>}

      {!authState.isAuthenticated
      && (
      <div>
        <p>If you&lsquo;re viewing this page then you have successfully started this React application.</p>
        <button id="login-button" primary onClick={login}>Login</button>
      </div>
      )}
    </div>
  );
};
export default Home;