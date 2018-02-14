import { get } from '../util/fetchUtil'

export const fetchRemoteConfiguration = async (location) => {
    try {
        const config = await get(location)
        console.log('config is ', config)
        return config.body
    } catch (exception) {
        console.error('Failed to get configuration file: ', exception)
    }
}

export default {
    fetchRemoteConfiguration
}