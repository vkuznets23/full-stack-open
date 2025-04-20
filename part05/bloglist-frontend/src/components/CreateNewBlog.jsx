const CreateNewBlog = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleCreateNote,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNote}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url
          <input
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

export default CreateNewBlog
