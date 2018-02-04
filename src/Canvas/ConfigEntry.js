import React, { Component } from 'react'
import { fetchConfiguration } from './fetchConfiguration'

class ConfigEntry extends Component {
    constructor() {
        super()
        this.state = {
            configUrl: '',
            error: '',
            loading: false
        }
    }

    render() {
        return <div className="ConfigEntry">
            <h2>No config found</h2>
            <form onSubmit={(event) => this.submitConfigUrl(event)}>
                <label>
                    Please enter the location of your config.json file is located (local or remote):
                    <input
                        type="text"
                        value={this.state.configUrl}
                        onChange={event => this.setState({ configUrl: event.target.value })}
                    />
                </label>
            </form>
        </div>
    }

    async submitConfigUrl(event) {
        event.preventDefault()
        this.setState({ loading: true })

        const configuration = await fetchConfiguration(this.state.configUrl)

        if (configuration['apiToken'] && configuration['apiBaseUrl'] && configuration['projects']) {
            this.props.onConfigReceived(configuration)
        } else {
            console.error('Configuration does not contain all necessary keys')
            this.setState({
                loading: false,
                error: 'Configuration does not contain all necessary keys'
            })
        }
    }
}

export default ConfigEntry