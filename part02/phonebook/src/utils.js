export const isValidPhoneNumber = (number) => {
  const phoneRegex = /^\+(\d{3})-(\d{2})-(\d{3})-(\d{4})$/
  return phoneRegex.test(number.trim())
}

export const handlePersonExists = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}
