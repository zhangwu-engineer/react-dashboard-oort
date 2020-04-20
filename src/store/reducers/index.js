import { combineReducers } from 'redux'
import theme from './themeStore'
import projects from './projects'
import activityLogs from './activityLogs'

export default combineReducers({
  theme,
  projects,
  activityLogs,
})
