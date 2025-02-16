import placeholder from '../assets/placeholder.png'

const Numbers = ({ persons }) => {
  return (
    <div className="contacts-list">
      {persons.map((person) => {
        return (
          <div key={person.id} className="contact-container">
            <img
              src={person.photo || placeholder}
              alt="User avatar"
              className="img"
            />
            <div className="contact-data">
              <h3>{person.name}</h3>
              <p>{person.phone}</p>
            </div>
            <button className="delete-button"></button>
          </div>
        )
      })}
    </div>
  )
}

export default Numbers
