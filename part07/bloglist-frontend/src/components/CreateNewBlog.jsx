import { TextField, Typography, Box, Button } from '@mui/material'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreateNote }) => {
  return (
    <Box sx={{ maxWidth: 500, mt: 4 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Create New
      </Typography>
      <Box
        component="form"
        onSubmit={handleCreateNote}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
        />
        <TextField
          label="Url"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </Box>
    </Box>
  )
}

CreateNewBlog.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleCreateNote: PropTypes.func.isRequired,
}

export default CreateNewBlog
