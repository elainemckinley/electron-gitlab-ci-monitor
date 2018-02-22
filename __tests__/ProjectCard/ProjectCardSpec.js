import TestUtils from 'react-dom/test-utils'
import React from 'react'
import ProjectCard from '../../src/ProjectCard/ProjectCard'
import * as fetchProjectStatus from '../../src/ProjectCard/fetchProjectStatus'

const renderProjectCard = (additionalProps = {}) => {
    const props = {
        project: {
            displayName: 'My Project',
            location: 'my-team/my-project'
        },
        ...additionalProps
    }
    return TestUtils.renderIntoDocument(
        <ProjectCard {...props} />
    )
}

test('renders project information', () => {
    const output = renderProjectCard()

    const displayHeader = TestUtils.findRenderedDOMComponentWithTag(output, 'h2')
    expect(displayHeader.textContent).toEqual('My Project')
})

test('assigns updated status on a timer', async () => {
    const fetchProjectStatusResponse = new Promise(resolve => resolve({
        status: 'success',
        lastRun: '2018-01-01T12:00:00Z'
    }))

    fetchProjectStatus.fetchProjectStatus = jest.fn(() => fetchProjectStatusResponse)

    const output = renderProjectCard()

    const card = TestUtils.findRenderedDOMComponentWithClass(output, 'ProjectCard')
    expect(card.classList).toContain('pending')

    await fetchProjectStatusResponse
    expect(card.classList).toContain('success')
})

test('renders error when fetch fails', async () => {
    const fetchProjectStatusResponse = new Promise((resolve, reject) => reject(
        'failed to fetch'
    ))

    fetchProjectStatus.fetchProjectStatus = jest.fn(() => fetchProjectStatusResponse)

    const output = renderProjectCard()

    try {
        await fetchProjectStatusResponse
    } catch (ignored) {
        noOp()
    }

    const card = TestUtils.findRenderedDOMComponentWithClass(output, 'projectCardErrors')
    expect(card.textContent).toContain('failed to fetch')
})

const noOp = _ => _