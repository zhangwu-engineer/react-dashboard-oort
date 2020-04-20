import { GET_LOGS_SUCCESS } from "../constants/activityLogs";

const initialState = {
    logs: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOGS_SUCCESS:
            return Object.assign({}, state, {
                logs: action.payload
            })
        default: return state
    }
}

export default rootReducer;
