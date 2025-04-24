import express, { Response } from 'express'
import diagnosesService from '../services/diagnosesServices'
import { Diagnosis } from '../types/diagnosis'

const router = express.Router()

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosesService.getEntries())
})

export default router
