import { fetchRemoteConfiguration } from '../../src/ConfigurationEntry/fetchRemoteConfiguration'
import * as fetchUtil from '../../src/util/fetchUtil'

fetchUtil.get = jest.fn()

beforeEach(() => {
    fetchUtil.get.mockReturnValue(Promise.resolve({
        body: '{"apiBaseUrl": "https://www.gitlab.com/api/v4"}'
    }))
})

test('fetches configuration from url', async () => {
    const configLocation = 'https://example.com/gitlabConfigFile.json'
    const config = await fetchRemoteConfiguration(configLocation)

    expect(config).toEqual('{"apiBaseUrl": "https://www.gitlab.com/api/v4"}')
    expect(fetchUtil.get).toHaveBeenCalledWith(configLocation)
}) 
