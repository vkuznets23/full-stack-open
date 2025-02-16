import { Form } from '../components'

const Phonebook = ({
  name,
  setName,
  persons,
  setPersons,
  number,
  setNumber,
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
      />
    </div>
  )
}

export default Phonebook
