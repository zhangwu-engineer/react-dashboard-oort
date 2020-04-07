import axios from 'axios'

export const loadProjects = async () => {
  const url = '/json/pages_projects-list.json'
  const response = await axios.get(process.env.PUBLIC_URL + url)
  return response.data
}
