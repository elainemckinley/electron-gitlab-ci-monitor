export const fetchConfiguration = async (configUrl) => {
    if (configUrl.startsWith('http')) {
        // Config is remote
        const config = await fetch(configUrl)
        if (config.ok) {
            return await config.json()
        } else {
            throw new Error(`Failed to fetch configuration from ${configUrl}; returned ${config.status}`)
        }
    } else {
        // Config on file system. Won't work until we start building the project correctly.
        throw new Error('File based loading not implemented')
        // fs.readFile(configUrl, 'utf-8', (err, data) => {
        //     debugger
        // })
    }
}

export default {
    fetchConfiguration
}