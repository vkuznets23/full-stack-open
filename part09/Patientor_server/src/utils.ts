import { NewPatient } from './types/patients'

const parseName = (name: unknown): string => {
  if (!name || typeof name !== 'string')
    throw new Error('Incorrect or missing name')
  return name
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date)) // check if date is valid
}

const parseDate = (date: unknown): string => {
  if (!date || typeof date !== 'string' || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || typeof occupation !== 'string')
    throw new Error('Incorrect or missing occupation')
  return occupation
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || typeof ssn !== 'string')
    throw new Error('Incorrect or missing ssn')
  return ssn
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || typeof gender !== 'string' || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

const toNewPatient = (object: unknown): NewPatient => {
  if (typeof object !== 'object' || object === null) {
    throw new Error('Invalid data format')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
    }
    return newEntry
  }
  throw new Error('Incorrect data: some fields are missing')
}

export default toNewPatient
