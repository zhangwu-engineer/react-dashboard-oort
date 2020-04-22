import axios from 'axios'
import config from '../shared/config'

export const loadProjects = async () => {
  const sessionToken = localStorage.getItem('sessionToken')
  const response = await axios({
    method: 'get',
    url: config.PROJECTS_API_URL,
    headers: {
      Authorization: `Basic ${sessionToken}`
    }
  })
  return response.data
}

export const getProject = async (id) => {
  const sessionToken = localStorage.getItem('sessionToken')
  const response = await axios({
    method: 'get',
    url: `${config.PROJECTS_API_URL}/id`,
    headers: {
      Authorization: `Basic ${sessionToken}`
    }
  })
  return response.data
}

