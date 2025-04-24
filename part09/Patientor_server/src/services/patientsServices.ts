import patients from '../db/patients'
import { Patient } from '../types/patients'
import { NonSensitivePatient, NewPatient } from '../types/patients'
import { v4 as uuid } from 'uuid'

const getEntries = (): Patient[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  )
  return nonSensitivePatients
}

const findById = (id: string): NonSensitivePatient | undefined => {
  const entry = patients.find((p) => p.id === id)
  if (!entry) return undefined
  const { ssn, ...nonSensitiveEntry } = entry

  return nonSensitiveEntry
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
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
