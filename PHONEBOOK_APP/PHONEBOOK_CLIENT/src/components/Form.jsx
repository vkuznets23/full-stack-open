import contactService from '../services/service'
import placeholder from '/assets/placeholder.png'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import {
  isValidPhoneNumber,
  handlePersonExists,
  formatPhoneNumber,
  createFormData,
} from '../utils/phoneValidation'

const Form = ({ persons, setPersons }) => {
  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
    photo: null,
    photoPreview: null,
  })

  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12)

      const formattedPhone = formatPhoneNumber(digitsOnly)
      setFormFields({ ...formFields, phone: formattedPhone })
    } else {
      setFormFields({ ...formFields, [name]: value })
    }
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

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
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

    const name = formFields.name.trim()
    const phone = formFields.phone.trim()

    if (!name || !phone) {
      toast.error(`Please add both name and number`, { hideProgressBar: true })
      return
    }

    if (!isValidPhoneNumber(phone)) {
      toast.error(
        `${phone} is not a valid phone number. Use +XXX-XX-XXX-XXXX`,
        { hideProgressBar: true }
      )
      return
    }
    if (handlePersonExists(persons, name)) {
      toast.error(`${name} is already added to the phone book`, {
        hideProgressBar: true,
      })
      return
    }

    const formData = createFormData({
      name,
      phone,
      photo: formFields.photo || placeholder,
    })

    try {
      const response = await contactService.create(formData)
      const updatedPersons = [...persons, response]
      setPersons(updatedPersons)
      localStorage.setItem('contacts', JSON.stringify(updatedPersons))
      toast.success(`contact ${name} added to the list`)
      resetForm()
    } catch (error) {
      console.error('Error creating contact:', error)
      toast.error(
        `There was an error while creating the contact: ${error.message}`,
        { hideProgressBar: true }
      )
    }
  }

  const handleFocus = () => {
    if (!formFields.phone.startsWith('+')) {
      setFormFields({ ...formFields, phone: '+' })
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
            onFocus={handleFocus}
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
          ref={fileInputRef}
        />
        {formFields.photo && (
          <img src={formFields.photoPreview} alt="Preview" width="50" />
        )}
      </div>
    </form>
  )
}

export default Form
