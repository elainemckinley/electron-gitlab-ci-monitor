const simulator = require('quick-simulator-server')

const projects = [{
    name: 'account',
    status: 'success'
}, {
    name: 'validation',
    status: 'success'
}, {
    name: 'payment',
    status: 'success'
}, {
    name: 'orchestration',
    status: 'success'
}, {
    name: 'scheduling',
    status: 'created'
}, {
    name: 'login',
    status: 'success'
}, {
    name: 'chat',
    status: 'success'
}, {
    name: 'photos',
    status: 'success'
}, {
    name: 'notifications',
    status: 'success'
}, {
    name: 'agent',
    status: 'failed'
}, {
    name: 'payment',
    status: 'success'
}, {
    name: 'products',
    status: 'success'
}, {
    name: 'billing',
    status: 'running'
}]

const buildPipelinesUrl = (project) => `/api/v4/projects/development-team%2F${project}/pipelines`
const buildPipelinesConfig = (status) => {
    return {
        method: 'get',
        responseStatus: 200,
        responseBody: JSON.stringify([{
            id: 1,
            ref: 'master',
            status
        }])
    }
}

const buildPipelineUrl = (project) => `/api/v4/projects/development-team%2F${project}/pipelines/1`
const buildPipelineConfig = (status) => {
    return {
        method: 'get',
        responseStatus: 200,
        responseBody: JSON.stringify({
            id: 1,
            ref: 'master',
            status,
            user: {
                name: 'Bob Loblaw'
            },
            created_at: '2018-01-01T12:00:00Z',
            updated_at: '2018-01-01T12:00:00Z',
            started_at: '2018-01-01T12:00:00Z',
            finished_at: '2018-01-01T12:00:00Z',
            duration: 60,
        })
    }
}

const config = projects.reduce((accumulator, project) => {
    return {
        ...accumulator,
        [buildPipelinesUrl(project.name)]: buildPipelinesConfig(project.status),
        [buildPipelineUrl(project.name)]: buildPipelineConfig(project.status)
    }
}, {})

const sim = simulator(config, 3000)
module.exports = sim