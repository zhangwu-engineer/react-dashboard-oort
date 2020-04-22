import axios from 'axios'
import config from '../shared/config'

export const loadProjects = async () => {
  const oktaTokenStorage = localStorage.getItem('okta-token-storage')
  const accessToken = JSON.parse(oktaTokenStorage) && JSON.parse(oktaTokenStorage).accessToken.accessToken
  const response = await axios({
    method: 'get',
    url: config.PROJECTS_API_URL,
    headers: {
      Authorization: `Basic ${accessToken}`
    }
  })
  return response.data
}

export const getProject = async (id) => {
  const oktaTokenStorage = localStorage.getItem('okta-token-storage')
  const accessToken = JSON.parse(oktaTokenStorage) && JSON.parse(oktaTokenStorage).accessToken.accessToken
  const response = await axios({
    method: 'get',
    url: `${config.PROJECTS_API_URL}/id`,
    headers: {
      Authorization: `Basic ${accessToken}`
    }
  })
  return response.data
}

