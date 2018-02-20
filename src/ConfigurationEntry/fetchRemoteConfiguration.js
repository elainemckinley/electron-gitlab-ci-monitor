import { get } from '../util/fetchUtil'

export const fetchRemoteConfiguration = async (location) => {
    const config = await get(location)
    console.log('config is ', config)
    return config.body
}

export default {
    fetchRemoteConfiguration
}