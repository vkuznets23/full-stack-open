import { useState } from 'react';

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !author || !url) {
      alert('All fields are required');
      return;
    }

    createBlog({ title, author, url });

    // Clear input fields
    setTitle('');
    setAuthor('');
    setUrl('');

    // Close form
    if (toggleVisibility) toggleVisibility();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Blog Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={author}
          name="author"
          placeholder="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={url}
          name="url"
          placeholder="Blog URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default BlogForm;