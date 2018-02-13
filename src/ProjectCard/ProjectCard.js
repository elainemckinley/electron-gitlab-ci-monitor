import React, { Component } from 'react'
import './ProjectCard.css'
import fetchProjectStatus from './fetchProjectStatus'
import moment from 'moment'

class ProjectCard extends Component {
    constructor() {
        super()
        this.state = {
            status: 'pending',
            lastRun: 'never'
        }
    }

    componentDidMount() {
        const {
            project,
            apiBase,
            apiToken,
            refreshRate
        } = this.props

        const interval = setInterval(
            async () => {
                try {
                    const projectStatus = await fetchProjectStatus(
                        project.location, apiBase, apiToken)
                    this.setState({
                        ...projectStatus
                    })
                } catch (e) {
                    this.setState({ status: 'failed' })
                }
            },
            refreshRate
        )

        this.setState({
            interval
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        const { location, displayName } = this.props.project
        const { status, lastRun } = this.state
        const projectName = location.split('/').slice(-1)
        let displayStatus = status
        let timestamp = ''
        const statusClassList = []

        if (status === 'pending' || status === 'running') {
            statusClassList.push('loading')
        } else if (status === ' error') {
            displayStatus = 'error retrieving project'
        } else if (lastRun) {
            timestamp = moment(lastRun).format('ddd, MMM Do h:mma')
        }

        return <div className={`ProjectCard ${status}`}>
            <div>
                <h2>{displayName}</h2>
                <div className="description">
                    {projectName}
                </div>
            </div>
            <div className="footer">
                <span className={statusClassList.join(' ')}>{displayStatus}</span>
                <span>{timestamp}</span>
            </div>
        </div>
    }
}

export default ProjectCard