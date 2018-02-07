import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export const fetchConfiguration = async (configUrl) => {
    if (configUrl.startsWith('http')) {
        // Config is remote
        // TODO: Fix this to not use browser fetch (avoid CORS issues)
        const config = await fetch(configUrl)
        if (config.ok) {
            return await config.json()
        } else {
            throw new Error(`Failed to fetch configuration from ${configUrl}; returned ${config.status}`)
        }
    } else {
        // Config is on file system
        const config = await readFile(configUrl, 'utf-8')
        return JSON.parse(config)
    }
}

export default {
    fetchConfiguration
}