import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Button,
  Box,
  TextField,
  Link as MuiLink,
  List,
  ListItem,
  Paper,
  IconButton,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'

const SingleBlog = ({ blogs, handleLikeClick, handleCreateComment, handleDeleteNote }) => {
  const [commentText, setCommentText] = useState('')
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) return <Typography color="error">Can't find blog</Typography>

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateComment(blog.id, commentText)
    setCommentText('')
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {blog.title}
      </Typography>
      <MuiLink href={blog.url} target="_blank" rel="noopener" underline="hover">
        {blog.url}
      </MuiLink>
      <Box sx={{ my: 2 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">Likes: {blog.likes}</Typography>
          <IconButton size="small" onClick={() => handleLikeClick(blog)} color="primary">
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Button variant="outlined" size="small" onClick={() => handleLikeClick(blog)}>
          Like
        </Button>
      </Box>
      <Typography variant="body2" gutterBottom>
        Added by {blog.author}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Comments
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>

      <List>
        {blog.comments &&
          blog.comments.map((c, i) => (
            <ListItem key={i} sx={{ pl: 0 }}>
              - {c}
            </ListItem>
          ))}
      </List>
    </Paper>
  )
}

export default SingleBlog
