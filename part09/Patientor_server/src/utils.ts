import { z } from 'zod'

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
})
