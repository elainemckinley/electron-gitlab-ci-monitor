import requestBase from 'request'
import { promisify } from 'util'

export const get = async (location, requestOptions = {}) => {
    const requestGet = promisify(requestBase.get)
    try {
        const response = await requestGet(location, { json: true, ...requestOptions })
        if (response.statusCode < 400) {
            return response
        } else {
            throw `Received ${response}`
        }
    } catch (exception) {
        throw `Error calling ${location}: ${exception}`
    }
}