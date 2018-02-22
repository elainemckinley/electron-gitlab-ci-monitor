import RemoteConfig from '../../src/ConfigurationEntry/RemoteConfig'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import * as fetchRemoteConfiguration from '../../src/ConfigurationEntry/fetchRemoteConfiguration'
import { CONFIG_FILE_LOCATION } from '../../src/constants'

let fetchConfigurationPromise = Promise.resolve({
    apiToken: 'token',
    apiBaseUrl: 'url',
    projects: {}
})
let configMock, onConfigReceived, setErrors

beforeEach(() => {
    fetchRemoteConfiguration.fetchRemoteConfiguration = jest.fn().mockReturnValue(fetchConfigurationPromise)
    configMock = {
        get: jest.fn().mockReturnValue({}),
        set: jest.fn(),
        delete: jest.fn()
    }
    onConfigReceived = jest.fn()
    setErrors = jest.fn()
})

const renderRemoteConfig = (additionalProps = {}) => {
    return TestUtils.renderIntoDocument(
        <RemoteConfig
            config={configMock}
            setErrors={setErrors}
            onConfigReceived={onConfigReceived}
            {...additionalProps}
        />
    )
}

test('renders field to enter config file url', async () => {
    const output = renderRemoteConfig()

    const inputField = TestUtils.findRenderedDOMComponentWithTag(output, 'input')
    TestUtils.Simulate.change(
        inputField,
        {target: {value: 'http://example.com/some-config.json'}}
    )

    const form = TestUtils.findRenderedDOMComponentWithTag(output, 'form')
    TestUtils.Simulate.submit(form)

    await fetchConfigurationPromise
    expect(fetchRemoteConfiguration.fetchRemoteConfiguration).toHaveBeenCalledWith('http://example.com/some-config.json')
    expect(configMock.set).toHaveBeenCalledWith(CONFIG_FILE_LOCATION, {
        type: 'remote',
        location: 'http://example.com/some-config.json'
    })
})

test('clears stored location when missing required values', async () => {
    let configPromise = Promise.resolve({missing: 'values'})
    fetchRemoteConfiguration.fetchRemoteConfiguration = jest.fn().mockReturnValue(configPromise)
    const output = renderRemoteConfig()

    const inputField = TestUtils.findRenderedDOMComponentWithTag(output, 'input')
    TestUtils.Simulate.change(
        inputField,
        {target: {value: 'http://example.com/some-config.json'}}
    )

    const form = TestUtils.findRenderedDOMComponentWithTag(output, 'form')
    TestUtils.Simulate.submit(form)

    await configPromise
    expect(configMock.delete).toHaveBeenCalledWith(CONFIG_FILE_LOCATION)
})

test('automatically loads when stored config location exists', async () => {
    let configuration = {type: 'remote', location: '/some-stored-config.json'}
    configMock.get.mockReturnValue(configuration)
    renderRemoteConfig({loadConfigOnMount: true})

    const receivedConfig = await fetchConfigurationPromise
    expect(onConfigReceived).toHaveBeenCalledWith(receivedConfig)
})