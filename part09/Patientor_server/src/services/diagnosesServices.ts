import diagnoses from '../db/diagnoses'
import { Diagnosis } from '../types/diagnosis'

const getEntries = (): Diagnosis[] => {
  return diagnoses
}

export default {
  getEntries,
}
