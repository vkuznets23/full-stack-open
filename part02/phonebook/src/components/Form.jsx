import contactService from '../services/service'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { isValidPhoneNumber, handlePersonExists } from '../utils'

const Form = ({ persons, setPersons }) => {
  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
    photo: null,
    photoPreview: null,
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

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

  const resetForm = () => {
    setFormFields((prevFields) => {
      if (prevFields.photoPreview) {
        URL.revokeObjectURL(prevFields.photoPreview)
      }
      return {
        name: '',
        phone: '',
        photo: null,
        photoPreview: null,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newPerson = {
      name: formFields.name.trim(),
      phone: formFields.phone.trim(),
      photoUrl: formFields.photoUrl,
    }

    if (!newPerson.name.trim() || !newPerson.phone.trim()) {
      toast.error(`Please add both name and number`, {
        hideProgressBar: true,
      })
      return
    }

    if (!isValidPhoneNumber(newPerson.phone)) {
      toast.error(
        `${newPerson.phone} is not a valid phone number <br> Valid numbers: +123-456-7890 or +1234567890`,
        {
          hideProgressBar: true,
        }
      )
      return
    }
    if (handlePersonExists(persons, newPerson.name)) {
      toast.error(`${newPerson.name} is already added to the phone book`),
        {
          hideProgressBar: true,
        }
      return
    }

    const formData = new FormData()
    formData.append('name', newPerson.name)
    formData.append('phone', newPerson.phone)
    if (formFields.photo) {
      formData.append('photo', formFields.photo)
    }

    try {
      const response = await contactService.create(formData)
      setPersons((prevPersons) => [...prevPersons, response])
      toast.success(`contact ${newPerson.name} added to the list`)
      resetForm()
    } catch (error) {
      console.error('Error creating contact:', error)
      toast.error(
        `There was an error while creating the contact: ${error.message}`,
        {
          hideProgressBar: true,
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="phone-name-fields">
        <div className="name-field">
          <label htmlFor="name">*Name</label>
          <input
            className="field-input"
            name="name"
            id="name"
            autoComplete="off"
            placeholder="Pekka Salmonen"
            value={formFields.name}
            onChange={handleChange}
          />
        </div>
        <div className="phone-field">
          <label htmlFor="phone">*Phone</label>
          <input
            className="field-input"
            name="phone"
            id="phone"
            autoComplete="off"
            placeholder="+358-40-123-4567"
            value={formFields.phone}
            onChange={handleChange}
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
          id="photo"
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
