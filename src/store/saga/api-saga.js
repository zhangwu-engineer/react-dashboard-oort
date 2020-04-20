import { all } from 'redux-saga/effects'
import projectsSaga from './projects'
import logsSaga from './activityLogs'

export default function* () {
  yield all([
    projectsSaga(),
    logsSaga(),
  ])
}
