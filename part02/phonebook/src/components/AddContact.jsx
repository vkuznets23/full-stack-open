import { Form } from '../components'

const Phonebook = ({
  name,
  setName,
  persons,
  setPersons,
  number,
  setNumber,
  setNotification,
}) => {
  return (
    <div>
      <Form
        name={name}
        setName={setName}
        persons={persons}
        setPersons={setPersons}
        number={number}
        setNumber={setNumber}
        setNotification={setNotification}
      />
    </div>
  )
}

export default Phonebook
