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
            <h2>Remote</h2>
            <form onSubmit={(event) => {
                event.preventDefault()
                this.submitConfig(this.state.location)
            }}>
                <label>
                    Enter URL location of config file
                    <input
                        type="text"
                        value={this.state.location}
                        placeholder="http://www.example.com/config.json"
                        onChange={event => this.setState({location: event.target.value})}
                    />
                </label>
            </form>
        </div>
    }

    async submitConfig(location) {
        try {
            const configuration = await fetchRemoteConfiguration(location)

            if (configuration['apiToken'] && configuration['apiBaseUrl']
                && configuration['projects']) {
                this.props.config.set(CONFIG_FILE_LOCATION, {
                    type: 'remote',
                    location
                })
                this.props.onConfigReceived(configuration)
            } else {
                this.props.setErrors(['Error: specified configuration does not contain all necessary keys'])
                this.props.config.delete(CONFIG_FILE_LOCATION)
            }
        } catch (exception) {
            this.props.setErrors([exception.toString()])
        }
    }
}

export default RemoteConfig