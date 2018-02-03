import React, { Component } from 'react'
import './ProjectCard.css'

class ProjectCard extends Component {
    constructor() {
        super()
        this.state = {
            status: 'successful',
            lastRun: '24 minutes ago'
        }
    }

    componentDidMount() {
        // setInterval(() => {
        //     fetch('gitlab').then(response => this.setState({response}))
        // })
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