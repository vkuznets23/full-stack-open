import placeholder from '/assets/placeholder.png'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const ContactList = ({ persons, handleDelete }) => {
  return (
    <div className="contacts-list">
      {persons.map(({ id, name, phone, photoUrl }) => {
        return (
          <div key={id} className="contact-container">
            <img
              src={photoUrl || placeholder}
              alt={`Avatar of ${name}`}
              className="img"
            />
            <div className="contact-data">
              <h3>{name}</h3>
              <p>{phone}</p>
            </div>
            <button
              data-testid="delete-button"
              className="delete-button"
              onClick={() => handleDelete(id)}
            >
              <RiDeleteBin5Fill style={{ fontSize: '1.1rem' }} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ContactList
