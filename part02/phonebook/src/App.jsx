import { useState } from 'react'
import { contacts } from './db/contacts'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import Filter from './components/Filter'

console.log(contacts)
function App() {
  const [persons, setPersons] = useState(contacts)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

  const getFilteredContacts = () => {
    const searchLower = search.toLowerCase()
    return contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchLower) ||
        contact.phone.includes(search)
      )
    })
  }

  return (
    <>
      <AddContact
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        persons={persons}
        setPersons={setPersons}
      />

      <Filter search={search} setSearch={setSearch} />
      <ContactList persons={getFilteredContacts()} />
    </>
  )
}

export default App
