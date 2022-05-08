import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog component', () => {
  test('check blog title and author is rendered', () => {
    // Instantiate blog data for testing
    const blog = {
      title: 'name',
      author: 'arthor',
    }
    render(<Blog blog={blog}/>)
    const element = screen.getByText('name')
    expect(element).toBeDefined()
  })

  test('check url and likes are shown', async () => {
    const blog = {
      title: 'name',
      author: 'arthor',
      url: 'https',
      likes: 5,
      user: '627235376c1897cc3de1e2db'
    }

    const { container } = render(<Blog blog={blog}/>)

    // Simulate show button click
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const url = container.querySelector('.blog-url')
    const likes = container.querySelector('.blog-likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('check that updateLikes is executed', async () => {
    const blog = {
      title: 'name',
      author: 'arthor',
      url: 'https',
      likes: 5,
      user: '627235376c1897cc3de1e2db'
    }

    const mockHandler = jest.fn()
    render(<Blog blog={blog} updateLikes={mockHandler} />)
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})