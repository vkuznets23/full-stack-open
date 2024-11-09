import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0)
  /*
  selected is the current value of the state.
setSelected is the function that you use to change the value of selected.
  When you call setSelected(random), you're telling React to update the selected state 
  with the value stored in the random variable. */
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) // track votes for each anecdote
   
  // Function to add a vote to the current anecdote
  const addVote = () => {
    const newVotes = [...votes];  // Copy the votes array
    newVotes[selected] += 1;  // Increment vote for the selected anecdote
    setVotes(newVotes);  // Update the votes state
  };

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random) 
  }

  // Function to find the index of the anecdote with the most votes
  const mostVotedIndex = () => {
    const maxVotes = Math.max(...votes);
    return votes.indexOf(maxVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p> {/* Show votes for the currently selected anecdote */}
      <button onClick={addVote}>Vote</button>
      <button onClick={randomAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIndex()]}</p>
      <p>has {votes[mostVotedIndex()]} votes</p>
    </div>
  )
}

export default App


