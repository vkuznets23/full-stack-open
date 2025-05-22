/* eslint-disable @typescript-eslint/semi */
import { useState } from 'react'
import { Entry, NewEntry } from '../../types'
import patientService from '../../services/patients'

interface EntryFormProps {
  patientId: string
  onEntryAdded: (entry: Entry) => void
}

const EntryForm: React.FC<EntryFormProps> = ({ patientId, onEntryAdded }) => {
  const [type, setType] = useState<NewEntry['type']>('Hospital')

  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')

  // Hospital-specific
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  // OccupationalHealthcare-specific
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')

  // HealthCheck-specific
  const [healthCheckRating, setHealthCheckRating] = useState(0)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    let newEntry: NewEntry

    switch (type) {
      case 'Hospital':
        newEntry = {
          type: 'Hospital',
          date,
          specialist,
          description,
          diagnosisCodes: diagnosisCodes
            ? diagnosisCodes.split(',').map((c) => c.trim())
            : undefined,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        }
        break

      case 'OccupationalHealthcare':
        newEntry = {
          type: 'OccupationalHealthcare',
          date,
          specialist,
          description,
          diagnosisCodes: diagnosisCodes
            ? diagnosisCodes.split(',').map((c) => c.trim())
            : undefined,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        }
        break

      case 'HealthCheck':
        newEntry = {
          type: 'HealthCheck',
          date,
          specialist,
          description,
          diagnosisCodes: diagnosisCodes
            ? diagnosisCodes.split(',').map((c) => c.trim())
            : undefined,
          healthCheckRating,
        }
        break
    }

    try {
      const createdEntry = await patientService.createPatientEntry(
        patientId,
        newEntry
      )
      onEntryAdded(createdEntry)

      setDate('')
      setDescription('')
      setSpecialist('')
      setDiagnosisCodes('')
      setDischargeDate('')
      setDischargeCriteria('')
      setEmployerName('')
      setSickLeaveStart('')
      setSickLeaveEnd('')
      setHealthCheckRating(0)
    } catch (error) {
      console.error('Failed to add entry', error)
      alert('Failed to add entry. Please check the inputs.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Entry</h3>

      <div>
        <label>Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as NewEntry['type'])}
        >
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">
            Occupational Healthcare
          </option>
          <option value="HealthCheck">Health Check</option>
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Specialist</label>
        <input
          type="text"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Diagnosis Codes (comma separated)</label>
        <input
          type="text"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
        />
      </div>

      {/* different types*/}
      {type === 'Hospital' && (
        <>
          <div>
            <label>Discharge Date</label>
            <input
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Discharge Criteria</label>
            <input
              type="text"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              required
            />
          </div>
        </>
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <div>
            <label>Employer Name</label>
            <input
              type="text"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Sick Leave Start</label>
            <input
              type="date"
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
            />
          </div>

          <div>
            <label>Sick Leave End</label>
            <input
              type="date"
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
            />
          </div>
        </>
      )}

      {type === 'HealthCheck' && (
        <>
          <div>
            <label>Health Check Rating (0-3)</label>
            <input
              type="number"
              min={0}
              max={3}
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              required
            />
          </div>
        </>
      )}

      <button type="submit">Add Entry</button>
    </form>
  )
}

export default EntryForm
