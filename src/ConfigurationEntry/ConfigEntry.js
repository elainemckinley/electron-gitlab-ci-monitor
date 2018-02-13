import React, { Component } from 'react'
import './ConfigEntry.css'
import RemoteConfig from './RemoteConfig'
import LocalConfig from './LocalConfig'
import Config from 'electron-config'
const config = new Config()

class ConfigEntry extends Component {
    render() {
        return <div className="ConfigEntry">
            <h1>Configuration</h1>
            <div className="loaderContainer">
                <LocalConfig config={config} {...this.props} />
                <RemoteConfig config={config} {...this.props} />
            </div>
        </div>
    }
}

export default ConfigEntry