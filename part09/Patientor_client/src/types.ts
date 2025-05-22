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

export interface Entry {}

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
