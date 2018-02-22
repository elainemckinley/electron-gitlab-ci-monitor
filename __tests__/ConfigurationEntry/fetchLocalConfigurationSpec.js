import { fetchLocalConfiguration } from '../../src/ConfigurationEntry/fetchLocalConfiguration'
import fs from 'fs'

let response
beforeEach(() => {
    response = '{"apiBaseUrl": "https://www.gitlab.com/api/v4"}'
    fs.readFile = jest.fn((location, encoding, callback) => {
        callback(null, response)
    })
})

test('fetches configuration from file system', async () => {
    const configLocation = '/User/me/config.json'
    const config = await fetchLocalConfiguration(configLocation)

    expect(fs.readFile).toHaveBeenCalledWith(configLocation, 'utf-8', expect.any(Function))
    expect(config).toEqual({
        apiBaseUrl: 'https://www.gitlab.com/api/v4'
    })
})
