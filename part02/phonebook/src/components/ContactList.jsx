import placeholder from '../assets/placeholder.png'
import contactService from '../services/service'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const ContactList = ({ persons, setPersons }) => {
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this contact?'
    )
    if (confirmed) {
      try {
        await contactService.remove(id)

        setPersons(persons.filter((person) => person.id !== id))
      } catch (err) {
        console.error('Error deleting contact:', err)
        alert('There was an error while deleting the contact')
      }
    }
  }

  return (
    <div className="contacts-list">
      {persons.map(({ id, name, phone, photo }) => {
        return (
          <div key={id} className="contact-container">
            <img
              src={photo || placeholder}
              alt={`Avatar of ${name}`}
              className="img"
            />
            <div className="contact-data">
              <h3>{name}</h3>
              <p>{phone}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(id)}>
              <RiDeleteBin5Fill style={{ fontSize: '1.1rem' }} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ContactList
