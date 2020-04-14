import {
  GET_PROJECTS_REQUESTED,
  GET_PROJECT_REQUESTED,
  DELETE_PROJECT_REQUESTED,
  CREATE_PROJECT_REQUESTED,
  UPDATE_PROJECT_REQUESTED
} from '../constants/action-types'

export function getProjects() {
  return { type: GET_PROJECTS_REQUESTED }
}

export function getProject(id) {
  return { type: GET_PROJECT_REQUESTED, id }
}

export function deleteProject(id) {
  return { type: DELETE_PROJECT_REQUESTED, id }
}

export function createProject(project) {
  return { type: CREATE_PROJECT_REQUESTED, project }
}

export function updateProject(project) {
  return { type: UPDATE_PROJECT_REQUESTED, project }
}