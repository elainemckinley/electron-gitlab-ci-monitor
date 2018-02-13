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
        const classList = ['ProjectCard']
        const statusClassList = []
        const projectName = location.split('/').slice(-1)
        let timestamp

        classList.push(status)
        if (status === 'pending' || status === 'running') {
            statusClassList.push('loading')
        } else {
            timestamp = lastRun ? moment(lastRun).format('ddd, MMM Do h:mma') : ''
        }

        return <div className={classList.join(' ')}>
            <div>
                <h2>{displayName}</h2>
                <div className="description">
                    {projectName}
                </div>
            </div>
            <div className="footer">
                <span className={statusClassList.join(' ')}>{status}</span>
                <span>{timestamp}</span>
            </div>
        </div>
    }
}

export default ProjectCard