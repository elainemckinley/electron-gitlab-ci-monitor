import ConfigEntry from '../../src/ConfigurationEntry/ConfigEntry'
import TestUtils from 'react-dom/test-utils'
import stubComponent from '../testHelpers/stubComponent'
import React from 'react'
import LocalConfig from '../../src/ConfigurationEntry/LocalConfig'
import RemoteConfig from '../../src/ConfigurationEntry/RemoteConfig'

stubComponent(LocalConfig, RemoteConfig)

jest.mock('electron-config', () => function () {
    this.value = 'mockConfig'
})

const renderConfigEntry = () => TestUtils.renderIntoDocument(<ConfigEntry />)

test('renders local and remote config components', () => {
    const output = renderConfigEntry()

    const localConfig = TestUtils.findRenderedComponentWithType(output, LocalConfig)
    expect(localConfig.props.config.value).toEqual('mockConfig')

    const remoteConfig = TestUtils.findRenderedComponentWithType(output, RemoteConfig)
    expect(remoteConfig.props.config.value).toEqual('mockConfig')
})

test('renders errors when triggered by config components', () => {
    const output = renderConfigEntry()
    const localConfig = TestUtils.findRenderedComponentWithType(output, LocalConfig)
    const remoteConfig = TestUtils.findRenderedComponentWithType(output, RemoteConfig)

    expect(TestUtils.scryRenderedDOMComponentsWithClass(output, 'errors').length).toEqual(0)

    localConfig.props.setErrors(['local config failed!'])
    remoteConfig.props.setErrors(['remote config failed!'])

    const errors = TestUtils.scryRenderedDOMComponentsWithClass(output, 'error')
    expect(errors.length).toEqual(2)
    expect(errors[0].textContent).toContain('local config failed!')
    expect(errors[1].textContent).toContain('remote config failed!')
})