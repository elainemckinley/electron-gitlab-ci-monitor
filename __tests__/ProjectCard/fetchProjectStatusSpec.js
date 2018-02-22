import { fetchProjectStatus } from '../../src/ProjectCard/fetchProjectStatus'
import * as fetchUtil from '../../src/util/fetchUtil'

beforeEach(() => {
    fetchUtil.get = jest.fn()
    fetchUtil.get.mockReturnValueOnce(Promise.resolve({
        body: [{
            id: '2',
            status: 'skipped'
        }, {
            id: '1'
        }]
    }))
    fetchUtil.get.mockReturnValueOnce(Promise.resolve({
        body: {
            id: '1',
            status: 'just fine',
            user: {
                name: 'Bob Loblaw'
            },
            finished_at: 'Today'
        }
    }))
})

test('fetches project status', async () => {
    const projectStatus = await fetchProjectStatus('my-team/my-project', 'http://fake-gitlab.com/api/v4', 'mytoken')
    expect(projectStatus).toEqual({
        status: 'just fine',
        lastModifiedBy: 'Bob Loblaw',
        lastRun: 'Today'
    })
})