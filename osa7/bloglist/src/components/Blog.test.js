import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component

  const blog = {
    title: 'Blog for testing',
    author: 'Peter Pan',
    url: 'https://google.com',
    likes: 5,
  }

  const mockLike = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} handleLike={mockLike} />)
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

  test('after clicking the button, the hidden data is displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls event handler twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
