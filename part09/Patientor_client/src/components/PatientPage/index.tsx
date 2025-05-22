/* eslint-disable @typescript-eslint/semi */
import { useEffect, useState } from 'react'
import patientService from '../../services/patients'
import { Diagnosis, Patient } from '../../types'
import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import EntryDetails from './Entry'

interface PatientPageProps {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>() // hook that let get params from url

  const [patient, setPatient] = useState<Patient | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchPatient = async () => {
      try {
        const patient = await patientService.getPatient(id)
        setPatient(patient)
      } catch (err) {
        setError('Failed to fetch patient data')
      }
    }
    fetchPatient()
  }, [id])

  if (error) return <div>{error}</div>
  if (!patient) return <div>Loading...</div>
  return (
    <div>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {patient.name}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <span>⚧</span>
        )}
      </h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <ul>
        {patient.entries.map((entry) => (
          <li key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PatientPage
