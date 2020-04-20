import axios from 'axios'
import config from '../shared/config'

export const loadProjects = async () => {
    console.log(config)
    const url = '/activity'
    const response = await axios.get(config.ACTIVITY_LOG_API + url)
    return response.data
}
