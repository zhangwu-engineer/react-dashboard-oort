import axios from 'axios'

export const loadProjects = async () => {
  const response = await axios({
    method: 'get',
    url: 'https://staging.ctrl.oort.io/projects',
    headers: {
      Authorization: 'Basic c3RhZ2luZzoybnR0aFB2Tg=='
    }
  })
  return response.data
}

export const getProject = async (id) => {
  const response = await axios({
    method: 'get',
    url: 'https://staging.ctrl.oort.io/projects/'+id,
    headers: {
      Authorization: 'Basic c3RhZ2luZzoybnR0aFB2Tg=='
    }
  })
  return response.data
}
