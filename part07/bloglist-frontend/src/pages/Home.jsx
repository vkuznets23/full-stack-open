import { Blog, CreateNewBlog, Togglable } from "../components";

const Home = ({
  blogs,
  createNewBlogRef,
  handleCreateNote,
  handleDeleteNote,
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => (
  <div>
    <Togglable
      buttonLabelShow="create blog"
      buttonLabelHide="cancel"
      ref={createNewBlogRef}
    >
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
    <h2>Blogs</h2>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleDeleteNote={handleDeleteNote}
        currentUser={user}
      />
    ))}
  </div>
);
export default Home;
