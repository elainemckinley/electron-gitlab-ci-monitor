import React, { Component } from 'react'
import { CONFIG_FILE_LOCATION } from '../constants'
import { fetchRemoteConfiguration } from './fetchRemoteConfiguration'

class RemoteConfig extends Component {
    constructor() {
        super()
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        const {config, loadConfigOnMount} = this.props
        const configuration = config.get(CONFIG_FILE_LOCATION, {})
        if (configuration.type === 'remote' && loadConfigOnMount) {
            this.submitConfig(configuration.location)
        }
    }

    render() {
        return <div className="urlLoader">
            <h4>Remote</h4>
            <form onSubmit={(event) => {
                event.preventDefault()
                this.submitConfig(this.state.location)
            }}>
                <label>
                    Enter URL location of config file
                    <input type="text"
                        value={this.state.location}
                        onChange={event => this.setState({ location: event.target.value })}
                    />
                </label>
            </form>
        </div>
    }

    async submitConfig(location) {
        const configuration = await fetchRemoteConfiguration(location)

        if (configuration['apiToken'] && configuration['apiBaseUrl'] && configuration['projects']) {
            this.props.config.set(CONFIG_FILE_LOCATION, {
                type: 'remote',
                location
            })
            this.props.onConfigReceived(configuration)
        } else {
            console.error('Configuration does not contain all necessary keys')
            config.delete(CONFIG_FILE_LOCATION)
        }
    }
}

export default RemoteConfig