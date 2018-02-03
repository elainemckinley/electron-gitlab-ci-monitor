import React, { Component } from 'react'
import './Canvas.css'
import ProjectCard from '../ProjectCard/ProjectCard'

class Canvas extends Component {
    constructor() {
        super()
        this.state = {
            projects: [{
                id: '5356024',
                displayName: 'Testing CI',
                location: 'austinmckinley/Testing-CI'
            }]
        }
    }

    componentDidMount() {
        // TODO set state of projects from input file
    }

    render() {
        return (
            <div className="Canvas">
                {
                    this.state.projects.map((project, index) =>
                        <ProjectCard
                            key={index}
                            project={project}
                            apiBase={this.state.apiBase}
                        />
                    )
                }
            </div>
        )
    }
}

export default Canvas
