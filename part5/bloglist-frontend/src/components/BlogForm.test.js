import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('blog form component', () => {
  test('check new blog is created with correct input', async () => {
    // Render blog form
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog}/>)

    // Create interactions
    const user = userEvent.setup()
    const titleInput = container.querySelector('#title')
    await user.type(titleInput, 'testing')

    const createBlogButton = screen.getByText('create')
    await user.click(createBlogButton)

    // Check blog details passed to createblog
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing')
  })

})