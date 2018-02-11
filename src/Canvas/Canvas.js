import React, { Component } from 'react'
import './Canvas.css'
import ConfigEntry from '../ConfigurationEntry/ConfigEntry'
import ProjectCard from '../ProjectCard/ProjectCard'

class Canvas extends Component {
    constructor() {
        super()
        this.state = {
            loadConfigOnMount: true
        }
    }

    render() {
        if (!this.state.config) {
            return <ConfigEntry
                onConfigReceived={config => this.setState({ config })}
                loadConfigOnMount={this.state.loadConfigOnMount}
            />
        } else {
            const { config } = this.state
            return (
                <div className="Canvas">
                    <div className="Projects">
                        {
                            config.projects.map((project, index) =>
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    apiBase={config.apiBaseUrl}
                                    apiToken={config.apiToken}
                                    refreshRate={config.projectRefreshMillis}
                                />
                            )
                        }
                    </div>
                    <a onClick={_ => {
                        this.setState({ config: null, loadConfigOnMount: false })
                    }}>
                        Configure
                    </a>
                </div>
            )
        }
    }
}

export default Canvas
