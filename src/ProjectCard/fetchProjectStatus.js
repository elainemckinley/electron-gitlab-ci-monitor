export default (projectId) => {
    const apiBase = 'https://gitlab.com/api/v4'
    const privateToken = 'your token here'
    const endpoint = `${apiBase}/projects/${projectId}/jobs?private_token=${privateToken}`

    return fetch(endpoint)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject({ status: 'failed' })
            }
        }).then(responseJson => {
            const mostRecentBuild = responseJson[0]

            const newStatus = {
                status: mostRecentBuild.status,
                lastModifiedBy: mostRecentBuild.commit.author_name,
                lastRun: mostRecentBuild.finished_at
            }
            console.log('changed to ', newStatus)
            return newStatus
        })
}