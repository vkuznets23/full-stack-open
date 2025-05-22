import { z } from 'zod'
import { newEntrySchema } from '../utils'
import { Diagnosis } from './diagnosis'

export type NewPatient = z.infer<typeof newEntrySchema>

interface BaseEntry {
  id: string
  date: string
  description: string
  specialist: string
  diagnosisCodes?: Diagnosis['code'][]
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>
export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  'id'
>
export type NewEntry =
  | NewHospitalEntry
  | NewHealthCheckEntry
  | NewOccupationalHealthcareEntry

export interface Patient extends NewPatient {
  id: string
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
