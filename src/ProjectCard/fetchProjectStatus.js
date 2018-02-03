export default async (projectId) => {
    const apiBase = 'https://gitlab.com/api/v4'
    const privateToken = 'your token here'
    const endpoint = `${apiBase}/projects/${projectId}/jobs?private_token=${privateToken}`

    const response = await fetch(endpoint)
    if (response.ok) {
        const mostRecentBuild = (await response.json())[0]
        const newStatus = {
            status: mostRecentBuild.status,
            lastModifiedBy: mostRecentBuild.commit.author_name,
            lastRun: mostRecentBuild.finished_at
        }
        console.log('changed to ', newStatus)
        return newStatus
    } else {
        throw {
            status: response.status,
            statusText: response.statusText
        }
    }
}