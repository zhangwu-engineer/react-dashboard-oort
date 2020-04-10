import { GET_PROJECTS_SUCCESS, GET_PROJECT_SUCCESS } from "../constants/action-types";

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
    default: return state
  }
}

export default rootReducer;