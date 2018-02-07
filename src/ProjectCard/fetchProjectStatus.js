export default async (projectLocation, apiBase, apiToken) => {
    try {
        const pipelinesUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines?private_token=${apiToken}`
        const pipelines = await fetch(pipelinesUrl)
        const pipelineId = (await pipelines.json())[0]['id']

        const lastPipelineUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines/${pipelineId}?private_token=${apiToken}`
        const lastPipelineResponse = await fetch(lastPipelineUrl)
        const lastPipeline = await lastPipelineResponse.json()

        const newStatus = {
            status: lastPipeline.status,
            lastModifiedBy: lastPipeline.user.name,
            lastRun: lastPipeline.finished_at
        }
        console.log('changed to ', newStatus)
        return newStatus
    } catch (exception) {
        console.error('Failed to get pipeline status: ', exception)
    }
}