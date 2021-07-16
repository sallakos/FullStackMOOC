import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component

  const blog = {
    title: 'Blog for testing',
    author: 'Peter Pan',
    url: 'https://google.com',
    likes: 5,
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent('Blog for testing')
  })

  test('renders hidden data', () => {
    expect(component.container.querySelector('.blogDetails')).toBeDefined()
  })

  test('at start the hidden data is not displayed', () => {
    const div = component.container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })
})
