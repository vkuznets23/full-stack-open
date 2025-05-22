import { z } from 'zod'
import { newEntrySchema } from '../utils'

export type NewPatient = z.infer<typeof newEntrySchema>

export interface Entry {}

export interface Patient extends NewPatient {
  id: string
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
