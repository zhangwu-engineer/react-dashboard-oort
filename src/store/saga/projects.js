import { takeEvery, call, put } from "redux-saga/effects"
import { loadProjects, getProject } from '../../api/projects'

export default function* () {
  yield takeEvery("GET_PROJECTS_REQUESTED", getProjectsRequested);
  yield takeEvery("GET_PROJECT_REQUESTED", getProjectRequested);
}

function* getProjectsRequested() {
  try {
    const payload = yield call(loadProjects);
    yield put({ type: "GET_PROJECTS_SUCCESS", payload });
  } catch (e) {
    yield put({ type: "GET_PROJECTS_FAILED", payload: e });
  }
}

function* getProjectRequested({ id }) {
  try {
    const payload = yield call(getProject, id);
    yield put({ type: "GET_PROJECT_SUCCESS", payload });
  } catch (e) {
    yield put({ type: "GET_PROJECT_FAILED", payload: e });
  }
}

