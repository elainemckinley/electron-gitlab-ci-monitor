import { get } from '../util/fetchUtil'

export const fetchRemoteConfiguration = async (location) => {
    const config = await get(location)
    return config.body
}

export default {
    fetchRemoteConfiguration
}