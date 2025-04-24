import { NewPatient } from './types/patients'
import { z } from 'zod'

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
})

const toNewPatient = (object: unknown): NewPatient => {
  return newEntrySchema.parse(object)
}

export default toNewPatient
