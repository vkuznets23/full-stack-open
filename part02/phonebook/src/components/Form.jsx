import contactService from '../services/service'
import { useState } from 'react'

const isValidPhoneNumber = (number) => /^[\d+-]+$/.test(number)

const handlePersonExists = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}

const Form = ({ persons, setPersons }) => {
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  const resetForm = () => {
    setName('')
    setNumber('')
    setPhoto(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newPerson = {
      id: String(persons.length + 1),
      name: name.trim(),
      phone: number,
      photo: photo,
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

    try {
      const response = await contactService.create(newPerson)
      setPersons((prevPersons) => [...prevPersons, response])
      resetForm()
    } catch (error) {
      console.error('Error creating contact:', error)
      alert('There was an error while creating the contact')
    }
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
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handlePhotoChange}
      />
      {photo && <img src={photo} alt="Preview" width="100" />}
      <button type="submit"> add contact </button>
    </form>
  )
}

export default Form
