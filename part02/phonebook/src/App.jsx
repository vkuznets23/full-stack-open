import { useEffect, useState } from 'react'
import axios from 'axios'
// import { contacts } from './db/contacts'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import Header from './components/Header'

const url = 'http://localhost:3001/contacts'

function App() {
  const [persons, setPersons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(url)
        setPersons(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
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

  return (
    <main>
      <div className="container">
        {isLoading ? (
          <p>loading</p>
        ) : persons.length > 0 ? (
          <>
            <Header title="Contacts">
              <p style={{ paddingLeft: 5, paddingTop: 5 }}>
                total {persons.length} contacts{' '}
              </p>
            </Header>
            <AddContact persons={persons} setPersons={setPersons} />
            <Filter search={search} setSearch={setSearch} />
            <ContactList persons={getFilteredContacts()} />
          </>
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </main>
  )
}

export default App
