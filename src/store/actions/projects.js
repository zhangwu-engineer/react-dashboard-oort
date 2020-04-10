import { GET_PROJECTS_REQUESTED, GET_PROJECT_REQUESTED } from '../constants/action-types'

export function getProjects() {
  return { type: GET_PROJECTS_REQUESTED }
}

export function getProject(id) {
  return { type: GET_PROJECT_REQUESTED, id }
}