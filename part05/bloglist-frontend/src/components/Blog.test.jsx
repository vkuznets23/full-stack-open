import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Blog from './Blog'
import blogService from '../services/blogs';

vi.mock('../services/blogs');

test('renders blog title and author, but not url or likes by default', () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://test-url.com',
      likes: 10,
      id: 1
    }
  
    render(<Blog blog={blog} handleDelete={() => {}} />)
  
    // Check that the title and author are rendered
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument()
  
    expect(screen.queryByText('Test Author')).toBeNull()
    expect(screen.queryByText('https://example.com')).toBeNull()
    expect(screen.queryByText('Likes: 10')).toBeNull()
})

test('clicking the "View Details" button reveals author, url, and likes', () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10
    }
  
    render(<Blog blog={blog} handleDelete={vi.fn()} />)  // use vi.fn() instead jest.fn()
  
    // simulation of clicking "View Details"
    fireEvent.click(screen.getByText('View Details'))
    
    //we do it like this cos by and Author data are int diff components
    expect(screen.getByText(/Test Author/)).toBeInTheDocument()
    expect(screen.getByText(/https:\/\/example.com/)).toBeInTheDocument()
    expect(screen.getByText(/Likes: 10/)).toBeInTheDocument()
  })

  test('clicking the "Like" button once calls the event handler once', async () => {
    const handleDelete = vi.fn();
    
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
      id: 1
    };
  
    const updatedBlog = { ...blog, likes: 11 }; // Обновлённый блог с новыми лайками
  
    // Мокаем ответ от blogService.updateBlogLikes
    blogService.updateBlogLikes.mockResolvedValue(updatedBlog);
  
    render(<Blog blog={blog} handleDelete={handleDelete} />);
  
    // Кликаем по кнопке "View Details", чтобы раскрыть блог
    const viewDetailsButton = screen.getByText(/View Details/i);
    fireEvent.click(viewDetailsButton);
  
    // Ищем кнопку "Like"
    const likeButton = screen.getByRole('button', { name: /like/i });
  
    // Кликаем по кнопке "Like" дважды
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
  
    // Ожидаем, что handleLike был вызван дважды
    expect(blogService.updateBlogLikes).toHaveBeenCalledTimes(2);
    expect(handleDelete).not.toHaveBeenCalled();  // Проверяем, что функция удаления не была вызвана
  });