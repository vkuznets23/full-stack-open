import { useState } from 'react'

const App = () => {
  //hold the contacts
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  // create a new name
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    // Create a new person object and update state
    const newPerson = { name: newName }

    // Check if the person already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      // Add new person to the list
      setPersons([...persons, newPerson])
      setNewName('') // Clear the input field
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App
