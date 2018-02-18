import React, { Component } from 'react'
import { CONFIG_FILE_LOCATION } from '../constants'
import { fetchLocalConfiguration } from './fetchLocalConfiguration'
import { remote } from 'electron'

class LocalConfig extends Component {
    constructor() {
        super()
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        const {config, loadConfigOnMount} = this.props
        const configuration = config.get(CONFIG_FILE_LOCATION, {})
        if (configuration.type === 'local' && loadConfigOnMount) {
            this.submitConfig(configuration.location)
        }
    }

    render() {
        return <div className="fileSystemLoader">
            <h2>Local</h2>
            <form onSubmit={(event) => {
                event.preventDefault()
                this.submitConfig(this.state.location)
            }}>
                <label>Select config file on disk</label>
                <br />
                <button
                    onClick={() =>
                        remote.dialog.showOpenDialog(
                            {properties: ['openFile']},
                            (selectedLocation) => this.submitConfig(selectedLocation[0])
                        )
                    }
                >Choose File...
                </button>
            </form>
        </div>
    }

    async submitConfig(location) {
        const {config} = this.props
        const configuration = await fetchLocalConfiguration(location)

        if (configuration['apiToken'] && configuration['apiBaseUrl'] && configuration['projects']) {
            config.set(CONFIG_FILE_LOCATION, {
                type: 'local',
                location
            })
            this.props.onConfigReceived(configuration)
        } else {
            console.error('Configuration does not contain all necessary keys')
            config.delete(CONFIG_FILE_LOCATION)
        }
    }
}

export default LocalConfig