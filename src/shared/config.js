const ISSUER = process.env.REACT_APP_OKTA_ISSUER
const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;
const ACTIVITY_LOG_API = process.env.REACT_APP_ACTIVITY_LOG_API_URL;

const config = {
  ISSUER,
  CLIENT_ID,
  ACTIVITY_LOG_API
}

export default config

