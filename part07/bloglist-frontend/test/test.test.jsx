import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, CreateNewBlog } from '../src/components'
import { vi } from 'vitest'
import blogService from '../src/services/blogs'

describe('Togglable element', () => {
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

  beforeAll(() => {
    vi.spyOn(blogService, 'update').mockResolvedValue({ ...blog, likes: 11 })
  })

  beforeEach(() => {
    render(<Blog blog={blog} handleDeleteNote={handleDeleteNote} />)
  })

  test('renders blog title, but not URL, author or likes by default', () => {
    //test that before pressing button
    expect(screen.getByText('Blog Title')).toBeInTheDocument()

    const urlElement = screen.queryByText('https://blog.com')
    const author = screen.queryByText('Blog Author')
    const likesElement = screen.queryByText('10')

    expect(author).not.toBeInTheDocument()
    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })

  test('renders URL, author and likes after clicking "view" button', async () => {
    //test after pressing button
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('url: https://blog.com')).toBeInTheDocument()
    expect(screen.getByText('Author: Blog Author')).toBeInTheDocument()
    expect(screen.getByText('Likes: 10')).toBeInTheDocument()
  })

  test('clicking like button increases the like count', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('Likes: 10')).toBeInTheDocument()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    const updatedLikes = await screen.findByText('Likes: 11')
    expect(updatedLikes).toBeInTheDocument()
  })
})

test('calls handleCreateNote with correct details when submitted', async () => {
  const handleSubmit = vi.fn()
  const user = userEvent.setup()

  let title = ''
  let author = ''
  let url = ''

  const setTitle = (val) => (title = val)
  const setAuthor = (val) => (author = val)
  const setUrl = (val) => (url = val)

  render(
    <CreateNewBlog
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
      handleCreateNote={handleSubmit}
    />
  )
  // const viewButton = screen.getByText('create blog')
  // await user.click(viewButton)

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test Blog')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://testblog.com')

  await user.click(createButton)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
