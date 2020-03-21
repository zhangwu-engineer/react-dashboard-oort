const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ISSUER = process.env.REACT_APP_ISSUER;
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false;
const HOST = process.env.REACT_APP_HOST || 'localhost:3000';

const CALLBACK_PATH = '/implicit/callback';
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};

