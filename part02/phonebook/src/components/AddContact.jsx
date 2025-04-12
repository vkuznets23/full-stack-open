import { Form } from '../components'

const Phonebook = ({ persons, setPersons }) => {
  return (
    <div className="form-container">
      <Form persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default Phonebook
