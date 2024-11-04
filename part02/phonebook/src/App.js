import { useState, useEffect } from 'react'
import Form from './components/form.js'
import Filter from './components/filter.js'
import Numbers from './components/numbers.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39445323523'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      .catch(error => {
        console.log("Error fetching data:", error);
      })
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Add new</h3>
      <Form 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Numbers persons={persons} search={search}/>
    </div>
  )
}

export default App
