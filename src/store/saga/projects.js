import { takeEvery, call, put } from "redux-saga/effects"
import { loadProjects, getProject } from '../../api/projects'

export default function* () {
  yield takeEvery("GET_PROJECTS_REQUESTED", getProjectsRequested)
  yield takeEvery("GET_PROJECT_REQUESTED", getProjectRequested)
  yield takeEvery("DELETE_PROJECT_REQUESTED", deleteProjectRequested)
  yield takeEvery("CREATE_PROJECT_REQUESTED", createProjectRequested)
  yield takeEvery("UPDATE_PROJECT_REQUESTED", updateProjectRequested)
}

function* getProjectsRequested() {
  try {
    const payload = yield call(loadProjects)
    yield put({ type: "GET_PROJECTS_SUCCESS", payload })
  } catch (e) {
    yield put({ type: "GET_PROJECTS_FAILED", payload: e })
  }
}

function* getProjectRequested({ id }) {
  try {
    const payload = yield call(getProject, id)
    yield put({ type: "GET_PROJECT_SUCCESS", payload })
  } catch (e) {
    yield put({ type: "GET_PROJECT_FAILED", payload: e })
  }
}

function* deleteProjectRequested({ id }) {
  try {
    const payload = { id }
    yield put({ type: "DELETE_PROJECT_SUCCESS", payload })
  } catch (e) {
    yield put({ type: "DELETE_PROJECT_FAILED", payload: e })
  }
}

function* createProjectRequested({ project }) {
  try {
    const payload = project
    yield put({ type: "CREATE_PROJECT_SUCCESS", payload })
  } catch (e) {
    yield put({ type: "CREATE_PROJECT_FAILED", payload: e })
  }
}

function* updateProjectRequested({ project }) {
  try {
    const payload = project
    yield put({ type: "UPDATE_PROJECT_SUCCESS", payload })
  } catch (e) {
    yield put({ type: "UPDATE_PROJECT_FAILED", payload: e })
  }
}


