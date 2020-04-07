import { GET_PROJECTS_REQUESTED } from '../constants/action-types'

export function getProjects() {
  return { type: GET_PROJECTS_REQUESTED }
}