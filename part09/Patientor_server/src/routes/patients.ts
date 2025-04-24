import express, { Response } from 'express'
import patientServices from '../services/patientsServices'
import { NonSensitivePatient } from '../types/patients'
import toNewPatient from '../utils'
import { z } from 'zod'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientServices.getEntries())
})

router.get('/:id', (req, res) => {
  const patient = patientServices.findById(String(req.params.id))
  if (patient) res.send(patient)
  else res.sendStatus(404)
})

router.post('/', (req, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body) //validation
    const addedPatient = patientServices.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues })
    } else {
      res.status(400).send({ error: 'unknown error' })
    }
  }
})

export default router
