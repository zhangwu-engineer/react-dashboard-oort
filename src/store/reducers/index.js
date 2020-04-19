import { combineReducers } from 'redux'
import theme from './themeStore'
import projects from './projects'

export default combineReducers({
  theme,
  projects,
})
