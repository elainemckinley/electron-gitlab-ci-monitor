export default async (projectId, apiBase, apiToken) => {
    const endpoint = `${apiBase}/projects/${projectId}/jobs?private_token=${apiToken}`

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
        throw new Error(`List project jobs failed with code ${response.status} and body ${response.statusText}`)
    }
}