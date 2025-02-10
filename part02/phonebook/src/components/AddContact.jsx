import Header from './Header'
import Form from './Form'

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
      <Header title="Phonebook" />
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
