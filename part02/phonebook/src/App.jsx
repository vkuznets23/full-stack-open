import { useEffect, useState } from 'react'
import contactService from './services/service'
import {
  AddContact,
  ContactList,
  Filter,
  Header,
  Loading,
  Notification,
} from './components'

function App() {
  const [persons, setPersons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isToggled, setIsToggled] = useState(false)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contactService.getAll()
        setPersons(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch contacts:', error)
        setNotification({ message: 'Failed to fetch contacts', type: 'error' })
      }
    }
    fetchData()
  }, [])

  const getFilteredContacts = () => {
    const searchLower = search.toLowerCase()

    return persons.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchLower) ||
        contact.phone.includes(search)
      )
    })
  }

  if (isLoading) {
    return <Loading />
  }

  if (persons.length === 0) {
    return <p>No contacts found</p>
  }

  return (
    <main>
      <div className="container">
        <Notification
          message={notification.message}
          type={notification.type}
          setMessage={(msg, type) => setNotification({ message: msg, type })}
        />
        <Header
          title="Contacts"
          persons={persons}
          setIsToggled={setIsToggled}
          isToggled={isToggled}
        ></Header>
        {isToggled && (
          <AddContact
            persons={persons}
            setPersons={setPersons}
            setNotification={setNotification}
          />
        )}
        <Filter search={search} setSearch={setSearch} />
        <ContactList
          persons={getFilteredContacts()}
          setPersons={setPersons}
          setNotification={setNotification}
        />
      </div>
    </main>
  )
}

export default App
