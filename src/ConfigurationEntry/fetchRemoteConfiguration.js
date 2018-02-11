import { get } from '../util/fetchUtil'

export const fetchRemoteConfiguration = async (location) => {
    try {
        const config = get(location)
        return config.body
    } catch (exception) {
        console.error('Failed to get confiuration file: ', exception)
    }
}

export default {
    fetchRemoteConfiguration
}