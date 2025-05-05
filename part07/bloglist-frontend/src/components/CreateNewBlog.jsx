import PropTypes from 'prop-types'

const CreateNewBlog = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreateNote }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNote}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            id="url"
            data-testid="url"
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
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
