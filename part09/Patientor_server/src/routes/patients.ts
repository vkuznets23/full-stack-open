import express, { Response } from 'express'
import patients from '../db/patients'
import { NonSensitivePatient } from '../types/patients'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  )
  res.json(nonSensitivePatients)
})

export default router
