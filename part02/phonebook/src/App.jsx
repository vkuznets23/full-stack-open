import { useState } from 'react'
import { contacts } from './data'
import Phonebook from './components/Phonebook'
import Numbers from './components/Numbers'

function App() {
  const [persons, setPersons] = useState(contacts)
  const [name, setName] = useState('')

  return (
    <>
      <Phonebook
        name={name}
        setName={setName}
        persons={persons}
        setPersons={setPersons}
      />
      <Numbers persons={persons} />
    </>
  )
}

export default App
