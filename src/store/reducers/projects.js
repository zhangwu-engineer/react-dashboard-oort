import { GET_PROJECTS_SUCCESS } from "../constants/action-types";

const initialState = {
  projects: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: action.payload
      })
    default: return state
  }
}

export default rootReducer;