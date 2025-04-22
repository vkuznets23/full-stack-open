import { render, screen, fireEvent } from '@testing-library/react'
import { Blog } from '../src/components'
import { vi } from 'vitest'

test('renders blog title, but not URL, author or likes by default', () => {
  const blog = {
    id: '1234',
    user: {
      _id: '12345',
      username: 'vika',
    },
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://blog.com',
    likes: 10,
  }

  const handleDeleteNote = vi.fn() //mock the function

  render(<Blog blog={blog} handleDeleteNote={handleDeleteNote} />)

  //test that before pressing button
  const title = screen.getByText('Blog Title')
  expect(title).toBeInTheDocument()

  const urlElement = screen.queryByText('https://blog.com')
  const author = screen.queryByText('Blog Author')
  const likesElement = screen.queryByText('10')
  expect(author).not.toBeInTheDocument()
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()

  //test after pressing button
  const button = screen.getByText('view')
  fireEvent.click(button)

  expect(screen.getByText('url: https://blog.com')).toBeInTheDocument()
  expect(screen.getByText('Author: Blog Author')).toBeInTheDocument()
  expect(screen.getByText('Likes: 10')).toBeInTheDocument()
})
