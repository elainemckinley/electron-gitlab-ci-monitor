import { get } from '../util/fetchUtil'

const fetchProjectStatus = async (projectLocation, branches, apiBase, apiToken) => {
    const pipelinesUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines?private_token=${apiToken}`
    const pipelines = await get(pipelinesUrl)
    const lastPipeline = pipelines.body
        .filter(p => p.status !== 'skipped')
        .find(p => (branches && branches.length) ? branches.includes(p.ref) : true)

    if (!lastPipeline) {
        return {
            status: 'error'
        }
    }

    const pipelineId = lastPipeline['id']
    const lastPipelineUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines/${pipelineId}?private_token=${apiToken}`
    const lastPipelineResponse = await get(lastPipelineUrl)
    const lastPipelineDetails = lastPipelineResponse.body

    return {
        status: lastPipelineDetails.status,
        lastModifiedBy: lastPipelineDetails.user.name,
        lastRun: lastPipelineDetails.finished_at
    }
}

export { fetchProjectStatus }