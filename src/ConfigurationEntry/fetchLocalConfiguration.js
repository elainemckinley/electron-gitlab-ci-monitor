import fs from 'fs'
import { promisify } from 'util'
const readFile = promisify(fs.readFile)

export const fetchLocalConfiguration = async (location) => {
    const config = await readFile(location, 'utf-8')
    return JSON.parse(config)
}

export default {
    fetchLocalConfiguration
}