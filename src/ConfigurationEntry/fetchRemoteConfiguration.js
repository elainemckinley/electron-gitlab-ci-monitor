export const fetchRemoteConfiguration = async (location) => {
    // TODO: Fix this to not use browser fetch (avoid CORS issues)
    const config = await fetch(location)
    if (config.ok) {
        return await config.json()
    } else {
        throw new Error(`Failed to fetch configuration from ${location}; returned ${config.status}`)
    }
}

export default {
    fetchRemoteConfiguration
}