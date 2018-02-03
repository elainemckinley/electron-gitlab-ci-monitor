import React, { Component } from 'react'
import './ProjectCard.css'
import fetchProjectStatus from './fetchProjectStatus'

class ProjectCard extends Component {
    constructor() {
        super()
        this.state = {
            status: 'successful',
            lastRun: '24 minutes ago'
        }
    }

    componentDidMount() {
        const { project } = this.props

        setInterval(
            async () => {
                try {
                    const projectStatus = await fetchProjectStatus(project.id)
                    this.setState({
                        ...projectStatus
                    })
                } catch(e) {
                    this.setState({ status: 'failed' })
                }
            },
            10000
        )
    }

    render() {
        const { displayName, location } = this.props.project
        const classList = ['ProjectCard']
        classList.push(this.state.status)

        return <div className={classList.join(' ')}>
            <h2>{displayName}</h2>
            <h4>{location}</h4>
        </div>
    }
}

export default ProjectCard