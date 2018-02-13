import { get } from '../util/fetchUtil'

export default async (projectLocation, apiBase, apiToken) => {
    try {
        const pipelinesUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines?private_token=${apiToken}`
        const pipelines = await get(pipelinesUrl)
        const filteredPipelines = pipelines.body.filter(p => p.status !== 'skipped')
        const pipelineId = filteredPipelines[0]['id']

        const lastPipelineUrl = `${apiBase}/projects/${encodeURIComponent(projectLocation)}/pipelines/${pipelineId}?private_token=${apiToken}`
        const lastPipelineResponse = await get(lastPipelineUrl)
        const lastPipeline = lastPipelineResponse.body

        const newStatus = {
            status: lastPipeline.status,
            lastModifiedBy: lastPipeline.user.name,
            lastRun: lastPipeline.finished_at
        }
        console.log('changed to ', newStatus)

        return newStatus
    } catch (exception) {
        console.error('Failed to get pipeline status: ', exception)

        return {
            status: 'error',
            lastModifiedBy: '',
            lastRun: ''
        }
    }
}