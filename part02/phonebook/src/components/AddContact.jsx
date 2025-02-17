import { Form } from '../components'

const Phonebook = ({ persons, setPersons, setNotification }) => {
  return (
    <div className="form-container">
      <Form
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  )
}

export default Phonebook
