import Header from './Header'
import Form from './Form'

const Phonebook = ({ name, setName, persons, setPersons }) => {
  return (
    <div>
      <Header title="Phonebook" />
      <Form
        name={name}
        setName={setName}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default Phonebook
