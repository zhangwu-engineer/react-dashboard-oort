const ISSUER = process.env.REACT_APP_OKTA_ISSUER
const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;
const ACTIVITY_LOG_API = process.env.REACT_APP_ACTIVITY_LOG_API_URL;
const CTRL_API_URL = process.env.REACT_APP_CTRL_API_URL;
const OORT_TOKEN_DOMAIN = process.env.REACT_APP_OORT_TOKEN_DOMAIN;

const config = {
  ISSUER,
  CLIENT_ID,
  ACTIVITY_LOG_API,
  CTRL_API_URL,
  OORT_TOKEN_DOMAIN
}

export default config

