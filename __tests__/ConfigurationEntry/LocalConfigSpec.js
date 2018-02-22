import LocalConfig from '../../src/ConfigurationEntry/LocalConfig'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { remote } from 'electron'
import * as fetchLocalConfiguration from '../../src/ConfigurationEntry/fetchLocalConfiguration'
import { CONFIG_FILE_LOCATION } from '../../src/constants'

let fetchConfigurationPromise = Promise.resolve({
    apiToken: 'token',
    apiBaseUrl: 'url',
    projects: {}
})
let configMock, onConfigReceived, setErrors

beforeEach(() => {
    fetchLocalConfiguration.fetchLocalConfiguration = jest.fn().mockReturnValue(fetchConfigurationPromise)
    configMock = {
        get: jest.fn().mockReturnValue({}),
        set: jest.fn(),
        delete: jest.fn()
    }
    onConfigReceived = jest.fn()
    setErrors = jest.fn()
})

const renderLocalConfig = (additionalProps = {}) => {
    return TestUtils.renderIntoDocument(
        <LocalConfig
            config={configMock}
            setErrors={setErrors}
            onConfigReceived={onConfigReceived}
            {...additionalProps}
        />
    )
}

test('renders button to select config file', async () => {
    const output = renderLocalConfig()

    const button = TestUtils.findRenderedDOMComponentWithTag(output, 'button')
    TestUtils.Simulate.click(button)

    await fetchConfigurationPromise
    expect(remote.dialog.showOpenDialog).toHaveBeenCalled()
    expect(fetchLocalConfiguration.fetchLocalConfiguration).toHaveBeenCalledWith('/some-config.json')
    expect(configMock.set).toHaveBeenCalledWith(CONFIG_FILE_LOCATION, {
        type: 'local',
        location: '/some-config.json'
    })
})

test('clears stored location when missing required values', async () => {
    let configPromise = Promise.resolve({missing: 'values'})
    fetchLocalConfiguration.fetchLocalConfiguration = jest.fn().mockReturnValue(configPromise)
    const output = renderLocalConfig()

    const button = TestUtils.findRenderedDOMComponentWithTag(output, 'button')
    TestUtils.Simulate.click(button)

    await configPromise
    expect(configMock.delete).toHaveBeenCalledWith(CONFIG_FILE_LOCATION)
})

test('automatically loads when stored config location exists', async () => {
    let configuration = {type: 'local', location: '/some-stored-config.json'}
    configMock.get.mockReturnValue(configuration)
    renderLocalConfig({loadConfigOnMount: true})

    const receivedConfig = await fetchConfigurationPromise
    expect(onConfigReceived).toHaveBeenCalledWith(receivedConfig)
})