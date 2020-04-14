import { GET_PROJECTS_SUCCESS, GET_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from "../constants/action-types";

const initialState = {
  projects: [],
  project: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: action.payload
      })
    case GET_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        project: action.payload
      })
    case DELETE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: state.projects.filter(project => project.id !== action.payload.id)
      })
    default: return state
  }
}

export default rootReducer;