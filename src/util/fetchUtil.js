import requestBase from 'request'
import { promisify } from 'util'

const requestGet = promisify(requestBase.get)

export const get = async (location) => {
    try {
        const response = await requestGet(location, { json: true })
        if (response.statusCode < 400) {
            return response
        } else {
            throw `Received ${response.statusCode}`
        }
    } catch (exception) {
        throw `Error calling ${location}: ${exception}`
    }
}