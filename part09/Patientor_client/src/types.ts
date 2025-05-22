/* eslint-disable @typescript-eslint/semi */
export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

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

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}

// eslint-disable-next-line @typescript-eslint/semi
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>
// eslint-disable-next-line @typescript-eslint/semi
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>
