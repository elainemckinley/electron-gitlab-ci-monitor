import React, { Component } from 'react'
import './Canvas.css'
import './Carousel.css'
import ConfigEntry from '../ConfigurationEntry/ConfigEntry'
import ProjectCard from '../ProjectCard/ProjectCard'
import { Carousel } from 'react-responsive-carousel'

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
                    <Carousel
                        showArrows={true}
                        showThumbs={false}
                        transitionTime={1000}
                        interval={config.autoScrollInterval}
                        infiniteLoop
                        autoPlay>
                        {Object.keys(config.projects).map(
                            (key, index) => this.renderProjectGroup(key, index)
                        )}
                    </Carousel>
                    <div id="Configure">
                        <a onClick={() => {this.setState({ config: null, loadConfigOnMount: false })}}>
                            Configure
                        </a>
                    </div>
                </div>
            )
        }
    }

    renderProjectGroup(key, index) {
        const { config } = this.state

        return <div className={`Group Group-${index} ${key}`} key={index}>
            <h1>{key}</h1>
            <div className="Projects Components">
                {config.projects[key].map(
                    (project, index) => this.renderProjectCards(project, index)
                )}
            </div>
        </div>
    }

    renderProjectCards(project, index) {
        const { config } = this.state

        return <ProjectCard
            key={index}
            project={project}
            apiBase={config.apiBaseUrl}
            apiToken={config.apiToken}
            refreshRate={config.refreshInterval}
        />
    }
}

export default Canvas
