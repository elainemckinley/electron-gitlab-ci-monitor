import fs from 'fs'
import { promisify } from 'util'

export const fetchLocalConfiguration = async (location) => {
    const config = await promisify(fs.readFile)(location, 'utf-8')
    return JSON.parse(config)
}

export default {
    fetchLocalConfiguration
}