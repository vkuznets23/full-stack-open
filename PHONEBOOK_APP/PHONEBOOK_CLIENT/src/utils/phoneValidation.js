const MAX_DIGITS = 12

export const formatPhoneNumber = (phone) => {
  let phoneNumber = phone.replace(/\D/g, '')

  if (phoneNumber.length > MAX_DIGITS) {
    phoneNumber = phoneNumber.slice(0, MAX_DIGITS)
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

export const createFormData = ({ name, phone, photo }) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('phone', phone)
  if (photo) {
    formData.append('photo', photo)
  }

  return formData
}

export const isValidPhoneNumber = (number) => {
  const phoneRegex = /^\+(\d{3})-(\d{2})-(\d{3})-(\d{4})$/
  return phoneRegex.test(number.trim())
}

export const handlePersonExists = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}
