import { fetchLocalConfiguration } from '../../src/ConfigurationEntry/fetchLocalConfiguration'
import fs from 'fs'
import util from 'util'

let promisifedReadFile

beforeEach(() => {
    promisifedReadFile = jest.fn()
    fs.readFile = jest.fn()
    util.promisify = jest.fn(() => promisifedReadFile)
    promisifedReadFile.mockReturnValue(Promise.resolve('{"apiBaseUrl": "https://www.gitlab.com/api/v4"}'))
})

test('fetches configuration from file system', async (done) => {
    const configLocation = '/User/me/config.json'
    const config = await fetchLocalConfiguration(configLocation)

    expect(promisifedReadFile).toHaveBeenCalledWith(configLocation, 'utf-8')
    expect(config).toEqual({
        apiBaseUrl: 'https://www.gitlab.com/api/v4'
    })

    done()
})
