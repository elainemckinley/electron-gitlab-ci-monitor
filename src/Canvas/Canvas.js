import React, { Component } from 'react'
import './Canvas.css'
import ConfigEntry from './ConfigEntry'
import ProjectCard from '../ProjectCard/ProjectCard'

class Canvas extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        if (!this.state.config) {
            return <ConfigEntry onConfigReceived={config => this.setState({ config })} />
        } else {
            const { config } = this.state
            return (
                <div className="Canvas">
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
            )
        }
    }
}

export default Canvas
