import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {name: newName };
    
    const exist = persons.some(person => person.name === newPerson.name)
    if (!exist) {
      setPersons(persons.concat(newPerson));
      setNewName('');
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, id) => (
          <div key={id}> {person.name} </div>
        ))}
      </div>
    </div>
  )
}

export default App
