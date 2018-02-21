import { get } from '../util/fetchUtil'

const fetchProjectStatus = async (projectLocation, apiBase, apiToken) => {
    const pipelinesUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines?private_token=${apiToken}`
    const pipelines = await get(pipelinesUrl)
    const filteredPipelines = pipelines.body.filter(p => p.status !== 'skipped')
    const pipelineId = filteredPipelines[0]['id']

    const lastPipelineUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines/${pipelineId}?private_token=${apiToken}`
    const lastPipelineResponse = await get(lastPipelineUrl)
    const lastPipeline = lastPipelineResponse.body

    return {
        status: lastPipeline.status,
        lastModifiedBy: lastPipeline.user.name,
        lastRun: lastPipeline.finished_at
    }
}

export { fetchProjectStatus }