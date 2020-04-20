import { takeEvery, call, put } from "redux-saga/effects"
import { loadProjects } from '../../api/activityLogs'
import {GET_LOGS_FAILED, GET_LOGS_REQUESTED, GET_LOGS_SUCCESS} from "../constants/activityLogs";

export default function* () {
    yield takeEvery(GET_LOGS_REQUESTED, getLogsRequested);
}

function* getLogsRequested() {
    try {
        const payload = yield call(loadProjects);
        yield put({ type: GET_LOGS_SUCCESS, payload });
    } catch (e) {
        yield put({ type: GET_LOGS_FAILED, payload: e });
    }
}
