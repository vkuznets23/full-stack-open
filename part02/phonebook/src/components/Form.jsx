const isValidPhoneNumber = (number) => /^[\d+-]+$/.test(number)

const handlePersonExists = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}

const Form = ({ persons, setPersons, name, setName, number, setNumber }) => {
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  const resetForm = () => {
    setName('')
    setNumber('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      id: String(persons.length + 1),
      name: name.trim(),
      phone: number,
    }

    if (!newPerson.name || !newPerson.phone) {
      alert(`Please add both name and number`)
      return
    }

    if (!isValidPhoneNumber(newPerson.phone)) {
      alert(`${newPerson.phone} is not a valid phone number`)
      return
    }
    if (handlePersonExists(persons, newPerson.name)) {
      alert(`${newPerson.name} is already added to the phone book`)
      return
    }
    setPersons(persons.concat(newPerson))
    resetForm()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" value={name} onChange={handleNameChange} />
      <div>
        <input
          placeholder="phone number"
          value={number}
          onChange={handleNumberChange}
        />
      </div>
      <button type="submit"> add contact </button>
    </form>
  )
}

export default Form
