import React, { Component } from 'react'
import './ProjectCard.css'
import { fetchProjectStatus } from './fetchProjectStatus'
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

        let refreshProject = async () => {
            try {
                const projectStatus = await fetchProjectStatus(project.location, project.branches, apiBase, apiToken)
                this.setState({
                    ...projectStatus,
                    error: null
                })
            } catch (exception) {
                this.setState({error: exception.toString()})
            }
        }

        refreshProject()
        const interval = setInterval(
            refreshProject,
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
        const {displayName} = this.props.project
        const {status, lastRun} = this.state
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
                {this.renderSubtitle()}
            </div>
            <div className="footer">
                <span className={statusClassList.join(' ')}>{displayStatus}</span>
                <span>{timestamp}</span>
            </div>
        </div>
    }

    renderSubtitle() {
        if (this.state.error) {
            return <span className="projectCardErrors">{this.state.error}</span>
        } else {
            return <div className="description">{this.props.project.location.split('/').slice(-1)}</div>
        }
    }
}

export default ProjectCard