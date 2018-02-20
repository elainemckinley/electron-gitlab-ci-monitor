import React, { Component } from 'react'
import './ConfigEntry.css'
import RemoteConfig from './RemoteConfig'
import LocalConfig from './LocalConfig'
import Config from 'electron-config'
const config = new Config()

class ConfigEntry extends Component {
    constructor() {
        super()
        this.state = {localConfigErrors: [], remoteConfigErrors: []}
    }

    render() {
        return <div className="ConfigEntry">
            <h1>Configuration</h1>
            <div className="loaderContainer">
                <LocalConfig config={config} {...this.props} setErrors={(errors) => this.setState({localConfigErrors: errors})} />
                <RemoteConfig config={config} {...this.props} setErrors={(errors) => this.setState({remoteConfigErrors: errors})} />
            </div>
            {this.renderErrors()}
        </div>
    }

    renderErrors() {
        const {localConfigErrors, remoteConfigErrors} = this.state
        const errors = [...localConfigErrors, ...remoteConfigErrors]
        if (errors.length) {
            return <div className="errors">
                {errors.map((error, key) => <h3 key={key}>{error}</h3>)}
            </div>
        }
    }
}

export default ConfigEntry