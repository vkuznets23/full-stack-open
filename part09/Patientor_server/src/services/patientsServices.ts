import patients from '../db/patients'
import { Patient } from '../types/patients'
import { NonSensitivePatient, NewPatient } from '../types/patients'
import { v4 as uuid } from 'uuid'

const getEntries = (): Patient[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  )
  return nonSensitivePatients
}

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: [],
  }
  patients.push(newPatient)
  return newPatient
}

export default {
  getNonSensitiveEntries,
  getEntries,
  findById,
  addPatient,
}
