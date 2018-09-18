import { fetchProjectStatus } from '../../src/ProjectCard/fetchProjectStatus'
import * as fetchUtil from '../../src/util/fetchUtil'

beforeEach(() => {
    fetchUtil.get = jest.fn()
    fetchUtil.get.mockReturnValueOnce(Promise.resolve({
        body: [{
            id: '1003',
            status: 'skipped',
            ref: 'feature'
        }, {
            id: '1002',
            ref: 'master'
        }, {
            id: '1001',
            ref: 'feature'
        }, {
            id: '1000',
            ref: 'feature'
        }]
    }))
    fetchUtil.get.mockReturnValueOnce(Promise.resolve({
        body: {
            id: '1001',
            status: 'just fine',
            user: {
                name: 'Bob Loblaw'
            },
            finished_at: 'Today'
        }
    }))
})

test('fetches pipeline from last relevant build', async () => {
    const projectStatus = await fetchProjectStatus('my-team/my-project', ['blah', 'feature'], 'http://fake-gitlab.com/api/v4', 'mytoken')
    expect(projectStatus).toEqual({
        status: 'just fine',
        lastModifiedBy: 'Bob Loblaw',
        lastRun: 'Today'
    })
    expect(fetchUtil.get).toHaveBeenCalledWith(
        'http://fake-gitlab.com/api/v4/projects/my-team%2Fmy-project/pipelines?private_token=mytoken',
        { strictSSL: true },
    )
    expect(fetchUtil.get).toHaveBeenCalledWith(
        'http://fake-gitlab.com/api/v4/projects/my-team%2Fmy-project/pipelines/1001?private_token=mytoken',
        { strictSSL: true },
    )
})

test('fetches last pipeline from master when no branch specified', async () => {
    await fetchProjectStatus('my-team/my-project', null, 'http://fake-gitlab.com/api/v4', 'mytoken')

    expect(fetchUtil.get).toHaveBeenCalledWith(
        'http://fake-gitlab.com/api/v4/projects/my-team%2Fmy-project/pipelines/1002?private_token=mytoken',
        { strictSSL: true },
    )
})