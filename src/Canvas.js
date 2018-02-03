import React, { Component } from 'react'
import './Canvas.css'
import ProjectCard from './ProjectCard/ProjectCard.js'

class Canvas extends Component {
  constructor() {
    super()
    this.state = {
      projects: [{
        location: 'austinmckinley/Testing-CI',
        displayName: 'Testing CI'
      }],
      apiBase: 'https://gitlab.com/'
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
            />)
        }
      </div>
    )
  }
}

export default Canvas
