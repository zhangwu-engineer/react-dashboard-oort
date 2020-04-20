import { GET_LOGS_REQUESTED } from '../constants/activityLogs'

export function getLogs() {
    return { type: GET_LOGS_REQUESTED }
}
