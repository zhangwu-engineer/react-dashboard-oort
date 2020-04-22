import axios from 'axios'
import config from '../shared/config'

export const loadProjects = async () => {
  const oktaTokenStorage = localStorage.getItem('okta-token-storage')
  const accessToken = JSON.parse(oktaTokenStorage) && JSON.parse(oktaTokenStorage).accessToken.accessToken
  const response = await axios({
    method: 'get',
    url: `${config.CTRL_API_URL}/projects`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}

export const getProject = async (id) => {
  const oktaTokenStorage = localStorage.getItem('okta-token-storage')
  const accessToken = JSON.parse(oktaTokenStorage) && JSON.parse(oktaTokenStorage).accessToken.accessToken
  const response = await axios({
    method: 'get',
    url: `${config.CTRL_API_URL}/projects/${id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}

