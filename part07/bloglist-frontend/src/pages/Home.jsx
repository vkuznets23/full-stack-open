import { Blog, CreateNewBlog, Togglable } from '../components'
import { Container, Typography } from '@mui/material'

const Home = ({
  blogs,
  createNewBlogRef,
  handleCreateNote,
  handleDeleteNote,
  handleLikeClick,
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => (
  <Container sx={{ mt: 4 }}>
    <Togglable buttonLabelShow="create blog" buttonLabelHide="cancel" ref={createNewBlogRef}>
      <CreateNewBlog
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        handleCreateNote={handleCreateNote}
      />
    </Togglable>

    <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
      Blogs
    </Typography>

    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleDeleteNote={handleDeleteNote}
        currentUser={user}
        handleLikeClick={handleLikeClick}
      />
    ))}
  </Container>
)

export default Home
