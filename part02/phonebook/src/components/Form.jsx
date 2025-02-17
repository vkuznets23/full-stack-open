import contactService from '../services/service'
import { useState } from 'react'

const isValidPhoneNumber = (number) => /^[\d+-]+$/.test(number.trim())

const handlePersonExists = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}

const Form = ({ persons, setPersons, setNotification }) => {
  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
    photo: null,
    photoPreview: null,
  })

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormFields((prevFields) => ({
        ...prevFields,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleNameChange = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      name: e.target.value,
    }))
  }

  const handleNumberChange = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      phone: e.target.value,
    }))
  }

  const resetForm = () => {
    if (formFields.photoPreview) {
      URL.revokeObjectURL(formFields.photoPreview)
    }
    setFormFields({ name: '', phone: '', photo: null, photoPreview: null })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newPerson = {
      name: formFields.name.trim(),
      phone: formFields.phone.trim(),
      photo: formFields.photo,
    }

    if (!newPerson.name.trim() || !newPerson.phone.trim()) {
      setNotification({
        message: `Please add both name and number`,
        type: 'error',
      })
      return
    }

    if (!isValidPhoneNumber(newPerson.phone)) {
      setNotification({
        message: `${newPerson.phone} is not a valid phone number`,
        type: 'error',
      })
      return
    }
    if (handlePersonExists(persons, newPerson.name)) {
      setNotification({
        message: `${newPerson.name} is already added to the phone book`,
        type: 'error',
      })
      return
    }

    try {
      const response = await contactService.create(newPerson)
      setPersons((prevPersons) => [...prevPersons, response])
      setNotification({
        message: `contact ${newPerson.name} added to the list`,
        type: 'success',
      })
      resetForm()
    } catch (error) {
      console.error('Error creating contact:', error)
      setNotification({
        message: 'There was an error while creating the contact',
        type: 'error',
      })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="phone-name-fields">
        <div className="name-field">
          <label htmlFor="phone">*Name</label>
          <input
            className="field-input"
            placeholder="Pekka Salmonen"
            value={formFields.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="phone-field">
          <label htmlFor="phone">*Phone</label>
          <input
            className="field-input"
            placeholder="+358 40 123 4567"
            value={formFields.phone}
            onChange={handleNumberChange}
          />
        </div>
        <button className="submit-btn" type="submit">
          add
        </button>
      </div>
      <div className="avatar-field">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handlePhotoChange}
        />
        {formFields.photo && (
          <img src={formFields.photoPreview} alt="Preview" width="50" />
        )}
      </div>
    </form>
  )
}

export default Form
