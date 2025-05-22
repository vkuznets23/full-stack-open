import express, { Response } from 'express'
import patientServices, { toNewEntry } from '../services/patientsServices'
import { NonSensitivePatient } from '../types/patients'
import { newPatientParser } from '../middleware/newPatientparser'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientServices.getEntries())
})

router.get('/:id', (req, res) => {
  const patient = patientServices.findById(String(req.params.id))
  if (patient) res.send(patient)
  else res.sendStatus(404)
})

router.post('/', newPatientParser, (req, res: Response) => {
  const addedPatient = patientServices.addPatient(req.body)
  res.json(addedPatient)
})

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id
    const newEntry = toNewEntry(req.body)
    const addedEntry = patientServices.addEntryToPatient(id, newEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
