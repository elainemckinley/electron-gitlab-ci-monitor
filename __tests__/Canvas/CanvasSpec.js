import Canvas from '../../src/Canvas/Canvas'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import ConfigEntry from '../../src/ConfigurationEntry/ConfigEntry'
import stubComponent from '../testHelpers/stubComponent'
import ProjectCard from '../../src/ProjectCard/ProjectCard'
import { Carousel } from 'react-responsive-carousel'

stubComponent(ConfigEntry, ProjectCard)

jest.mock('electron-config', () => function () {
    this.value = 'mockConfig'
})

const renderCanvas = () => TestUtils.renderIntoDocument(<Canvas />)

test('renders config entry on initial load', () => {
    const output = renderCanvas()

    expect(TestUtils.findRenderedComponentWithType(output, ConfigEntry))
})

describe('when configuration is received', () => {
    let output

    beforeEach(() => {
        output = renderCanvas()
        const configEntry = TestUtils.findRenderedComponentWithType(output, ConfigEntry)
        configEntry.props.onConfigReceived({
            projects: {
                page1: ['project1', 'project2'],
                page2: ['project3']
            },
            autoScrollInterval: 1234
        })
    })

    test('renders project cards when config received', () => {
        const carousel = TestUtils.findRenderedComponentWithType(output, Carousel)
        expect(carousel.props.children.length).toEqual(2)

        const projectCards = TestUtils.scryRenderedComponentsWithType(output, ProjectCard)
        expect(projectCards.length).toEqual(3)
        expect(projectCards[0].props.project).toEqual('project1')
        expect(projectCards[1].props.project).toEqual('project2')
        expect(projectCards[2].props.project).toEqual('project3')
    })

    test('configures carousel with timing information from configuration', () => {
        const carousel = TestUtils.findRenderedComponentWithType(output, Carousel)

        expect(carousel.props.interval).toEqual(1234)
    })
})

