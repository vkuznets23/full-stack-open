import { z } from 'zod'
import { newEntrySchema } from '../utils'

export type NewPatient = z.infer<typeof newEntrySchema>

export interface Patient extends NewPatient {
  id: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
