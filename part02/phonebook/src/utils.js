export const isValidPhoneNumber = (number) => /^[\d+-]+$/.test(number.trim())

export const handlePersonExists = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )
}
