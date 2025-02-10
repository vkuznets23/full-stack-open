const Form = ({ persons, setPersons, name, setName }) => {
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      id: String(persons.length + 1),
      name: name.trim(),
    }
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setName('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" value={name} onChange={handleNameChange} />
      <button type="submit"> add contact </button>
    </form>
  )
}

export default Form
