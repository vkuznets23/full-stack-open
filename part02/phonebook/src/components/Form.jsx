import contactService from '../services/service'
import placeholder from '/assets/placeholder.png'
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

  //delete
  const formatPhoneNumber = (phone) => {
    let phoneNumber = phone.replace(/\D/g, '')

    if (phoneNumber.length > 15) {
      phoneNumber = phoneNumber.slice(0, 15)
    }

    if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
      phoneNumber = `+${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
    } else if (phoneNumber.length > 6 && phoneNumber.length <= 9) {
      phoneNumber = `+${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        5
      )}-${phoneNumber.slice(5)}`
    } else if (phoneNumber.length > 9 && phoneNumber.length <= 12) {
      phoneNumber = `+${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        5
      )}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`
    } else if (phoneNumber.length > 12) {
      phoneNumber = `+${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        5
      )}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(
        8,
        12
      )}-${phoneNumber.slice(12)}`
    } else {
      phoneNumber = `+${phoneNumber.slice(0, 3)}`
    }

    return phoneNumber
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value)
      setFormFields({ ...formFields, phone: formattedPhone })
    } else {
      setFormFields({ ...formFields, [name]: value })
    }
  }

  //DelTe

  // const handleChange = (e) => {
  //   setFormFields({ ...formFields, [e.target.name]: e.target.value })
  // }

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
      photoUrl: formFields.photoUrl || placeholder,
    }

    if (!newPerson.name.trim() || !newPerson.phone.trim()) {
      toast.error(`Please add both name and number`, {
        hideProgressBar: true,
      })
      return
    }

    if (!isValidPhoneNumber(newPerson.phone)) {
      toast.error(
        `${newPerson.phone} is not a valid phone number. It doesnt match +XXX-XX-XXX-XXXX`,
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
            maxLength={16}
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
        />
        {formFields.photo && (
          <img src={formFields.photoPreview} alt="Preview" width="50" />
        )}
      </div>
    </form>
  )
}

export default Form
