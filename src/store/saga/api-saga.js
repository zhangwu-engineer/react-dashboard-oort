import { all } from 'redux-saga/effects'
import projectsSaga from './projects'

export default function* () {
  yield all([
    projectsSaga(),
  ])
}
