import patients from '../db/patients'
import { Diagnosis } from '../types/diagnosis'
import { Entry, HealthCheckRating, NewEntry, Patient } from '../types/patients'
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
  const patient = patients.find((p) => p.id === id)
  if (!patient) return undefined
  if (!patient.entries) {
    patient.entries = []
  }
  return patient
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

// ??
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>
}

const addEntryToPatient = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === id)
  if (!patient) {
    throw new Error('Patient not found')
  }
  const newEntry = {
    ...entry,
    id: uuid(),
  } as Entry

  patient.entries.push(newEntry)
  return newEntry
}

import {
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
} from '../types/patients'

export const toNewEntry = (object: any): NewEntry => {
  if (!object || !object.type) {
    throw new Error('Missing type')
  }

  switch (object.type) {
    case 'Hospital': {
      if (
        !object.date ||
        !object.description ||
        !object.specialist ||
        !object.discharge
      ) {
        throw new Error('Missing fields for Hospital entry')
      }

      const newHospitalEntry: NewHospitalEntry = {
        type: 'Hospital',
        date: object.date,
        description: object.description,
        specialist: object.specialist,
        discharge: object.discharge,
        diagnosisCodes: parseDiagnosisCodes(object),
      }

      return newHospitalEntry
    }

    case 'HealthCheck': {
      if (
        !object.date ||
        !object.description ||
        !object.specialist ||
        typeof object.healthCheckRating !== 'number'
      ) {
        throw new Error('Missing fields for HealthCheck entry')
      }

      const newHealthCheckEntry: NewHealthCheckEntry = {
        type: 'HealthCheck',
        date: object.date,
        description: object.description,
        specialist: object.specialist,
        healthCheckRating: object.healthCheckRating as HealthCheckRating,
        diagnosisCodes: parseDiagnosisCodes(object),
      }

      return newHealthCheckEntry
    }

    case 'OccupationalHealthcare': {
      if (
        !object.date ||
        !object.description ||
        !object.specialist ||
        !object.employerName
      ) {
        throw new Error('Missing fields for OccupationalHealthcare entry')
      }

      const newOccupationalEntry: NewOccupationalHealthcareEntry = {
        type: 'OccupationalHealthcare',
        date: object.date,
        description: object.description,
        specialist: object.specialist,
        employerName: object.employerName,
        sickLeave: object.sickLeave,
        diagnosisCodes: parseDiagnosisCodes(object),
      }

      return newOccupationalEntry
    }

    default:
      throw new Error(`Unknown entry type: ${object.type}`)
  }
}

export default {
  getNonSensitiveEntries,
  getEntries,
  findById,
  addPatient,
  addEntryToPatient,
}
