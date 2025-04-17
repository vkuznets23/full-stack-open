import { useCallback, useEffect, useState } from 'react'
import contactService from './services/service'
import { toast, ToastContainer } from 'react-toastify'
import {
  AddContact,
  ContactList,
  Filter,
  Header,
  Loading,
  ConfirmationModal,
} from './components'

function App() {
  const [persons, setPersons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isToggled, setIsToggled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [search, setSearch] = useState('')

  const fetchData = useCallback(async () => {
    const cached = localStorage.getItem('contacts')
    if (cached) {
      setPersons(JSON.parse(cached))
    }

    try {
      const data = await contactService.getAll()
      setPersons(data)
      localStorage.setItem('contacts', JSON.stringify(data)) // add to localsotorage
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
      toast.error(`Failed to fetch contacts: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getFilteredContacts = () => {
    const searchLower = search.toLowerCase()

    return persons.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchLower) ||
        contact.phone.includes(search)
      )
    })
  }

  const handleDelete = (id) => {
    setContactToDelete(id)
    setIsModalOpen(true)
  }
  const handleConfirm = async () => {
    try {
      await contactService.remove(contactToDelete)
      const updatedPersons = persons.filter(
        (person) => person.id !== contactToDelete
      )
      setPersons(updatedPersons)
      localStorage.setItem('contacts', JSON.stringify(updatedPersons)) //update localstorage
      toast.success(`contact deleted from the list`)
      setIsModalOpen(false)
    } catch (err) {
      console.error('Error deleting contact:', err)
      toast.error(
        `There was an error while deleting the contact: ${err.message}`
      )
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <main>
      <div className="container">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          newestOnTop
          stopOnFocus={true}
        />
        {isModalOpen && (
          <ConfirmationModal
            message="Are you sure you want to delete this contact?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        <Header
          title="Contacts"
          persons={persons}
          setIsToggled={setIsToggled}
          isToggled={isToggled}
        ></Header>
        {isToggled && <AddContact persons={persons} setPersons={setPersons} />}
        <Filter search={search} setSearch={setSearch} />
        {persons.length === 0 ? (
          <p style={{ marginTop: 20 }}>No contacts found</p>
        ) : (
          <ContactList
            persons={getFilteredContacts()}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </main>
  )
}

export default App
