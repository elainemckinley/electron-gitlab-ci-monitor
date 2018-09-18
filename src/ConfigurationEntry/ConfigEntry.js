import React, { Component } from 'react'
import './ConfigEntry.css'
import RemoteConfig from './RemoteConfig'
import LocalConfig from './LocalConfig'
import Config from 'electron-config'

class ConfigEntry extends Component {
    constructor() {
        super()
        this.state = {
            localConfigErrors: [],
            remoteConfigErrors: [],
            electronConfig: new Config(),
            strictSSL: true,
        }
    }

    render() {
        const props = {
            ...this.props,
            onConfigReceived: (config) => this.onConfigReceived(config),
        }
        return <div className="ConfigEntry">
            <h1>Configuration</h1>
            <div className="loaderContainer">
                <LocalConfig config={this.state.electronConfig} {...props} setErrors={(errors) => this.setState({localConfigErrors: errors})} />
                <RemoteConfig config={this.state.electronConfig} {...props} setErrors={(errors) => this.setState({remoteConfigErrors: errors})} />
            </div>
            {this.renderErrors()}
            {this.renderSslIgnoreOption()}
        </div>
    }

    renderErrors() {
        const {localConfigErrors, remoteConfigErrors} = this.state
        const errors = [...localConfigErrors, ...remoteConfigErrors]
        if (errors.length) {
            return <div className="errors">
                {errors.map((error, key) => <h3 className="error" key={key}>{error}</h3>)}
            </div>
        }
    }

    renderSslIgnoreOption() {
        return (<div className="semiHiddenOption">
            <label>Ignore SSL Validations (not recommended)</label>
            <input
                type="checkbox"
                value={!this.state.strictSSL}
                onChange={event => this.setState({strictSSL: !event.target.value})}
            />
        </div>)
    }

    onConfigReceived(config) {
        this.props.onConfigReceived({
            strictSSL: this.state.strictSSL,
            ...config,
        })
    }
}

export default ConfigEntry