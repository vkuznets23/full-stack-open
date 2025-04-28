// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({ handleSubmitForm, anecdote, setAnecdote }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          <input
            type="text"
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
