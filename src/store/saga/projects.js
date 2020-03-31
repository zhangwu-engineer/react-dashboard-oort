import { takeEvery, call, put } from "redux-saga/effects"
import { loadProjects } from '../../api/projects'

export default function* () {
  yield takeEvery("GET_PROJECTS_REQUESTED", getProjectsRequested);
}

function* getProjectsRequested() {
  try {
    const payload = yield call(loadProjects);
    yield put({ type: "GET_PROJECTS_SUCCESS", payload });
  } catch (e) {
    yield put({ type: "GET_PROJECTS_FAILED", payload: e });
  }
}
