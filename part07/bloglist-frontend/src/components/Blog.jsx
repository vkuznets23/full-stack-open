import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardActions, Typography, Button, IconButton, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link as RouterLink } from 'react-router-dom'

const Blog = ({ blog, handleDeleteNote, currentUser, handleLikeClick }) => {
  const dispatch = useDispatch()

  const blogFromStore = useSelector((state) => state.blogs.blogs.find((b) => b.id === blog.id))

  const likes = blogFromStore ? blogFromStore.likes : 0

  const isOwner = currentUser && (blog.user === currentUser.id || blog.user._id === currentUser.id)

  return (
    <Card variant="outlined" sx={{ mb: 2 }} data-testid="blog">
      <CardContent>
        <Typography
          variant="h6"
          component={RouterLink}
          to={`/blogs/${blog.id}`}
          sx={{ textDecoration: 'none', color: 'inherit' }}
          data-testid="blog-title"
        >
          {blog.title}
        </Typography>
        <Togglable buttonLabelShow="view" buttonLabelHide="hide">
          <>
            <Typography variant="body2" color="text.secondary">
              url: {blog.url}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Likes: {likes}
              </Typography>
              <IconButton size="small" onClick={() => handleLikeClick(blog)} color="primary">
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2">Author: {blog.author}</Typography>
            {isOwner && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteNote(blog.id)}
              >
                delete
              </Button>
            )}
          </>
        </Togglable>
      </CardContent>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    ]).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  handleDeleteNote: PropTypes.func.isRequired,
}

export default Blog
