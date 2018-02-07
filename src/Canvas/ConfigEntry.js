import React, { Component } from 'react'
import { fetchConfiguration } from './fetchConfiguration'
import Config from 'electron-config'
const config = new Config()

class ConfigEntry extends Component {
    constructor() {
        super()
        this.state = {
            configUrl: '',
            error: '',
            loading: false
        }
    }

    componentDidMount() {
        if (config.has('configUrl')) {
            this.submitConfigUrl(config.get('configUrl'))
        }
    }

    render() {
        return <div className="ConfigEntry">
            <h2>No config found</h2>
            <form onSubmit={(event) => {
                event.preventDefault()
                this.submitConfigUrl(this.state.configUrl)
            }}>
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

    async submitConfigUrl(configUrl) {
        this.setState({ loading: true })

        const configuration = await fetchConfiguration(configUrl)

        if (configuration['apiToken'] && configuration['apiBaseUrl'] && configuration['projects']) {
            config.set('configUrl', configUrl)
            this.props.onConfigReceived(configuration)
        } else {
            console.error('Configuration does not contain all necessary keys')
            config.delete('configUrl')
            this.setState({
                loading: false,
                error: 'Configuration does not contain all necessary keys'
            })
        }
    }
}

export default ConfigEntry