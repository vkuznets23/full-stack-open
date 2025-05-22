/* eslint-disable @typescript-eslint/semi */
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import WorkIcon from '@mui/icons-material/Work'
import { Diagnosis, Entry, HealthCheckRating } from '../../types'

interface EntryDetailsProps {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const findDiagnosisName = (code: string): string | undefined =>
    diagnoses.find((d) => d.code === code)?.name

  switch (entry.type) {
    case 'Hospital':
      return (
        <div
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <LocalHospitalIcon />
          <p>
            <strong>{entry.date}</strong>
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {findDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      )
    case 'OccupationalHealthcare':
      return (
        <div
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <WorkIcon />
          <p>
            <strong>{entry.date}</strong>
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {findDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
          <p>{entry.description}</p>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              Sick leave: {entry.sickLeave.startDate} -{' '}
              {entry.sickLeave.endDate}
            </p>
          )}
          <p>diagnose by {entry.specialist}</p>
        </div>
      )
    case 'HealthCheck':
      return (
        <div
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <FavoriteIcon />
          <p>
            <strong>{entry.date}</strong>
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {findDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
          <p>{entry.description}</p>
          <p>
            Health rating:{' '}
            {(() => {
              switch (entry.healthCheckRating) {
                case HealthCheckRating.Healthy:
                  return '🟢 Healthy'
                case HealthCheckRating.LowRisk:
                  return '🟡 Low Risk'
                case HealthCheckRating.HighRisk:
                  return '🟠 High Risk'
                case HealthCheckRating.CriticalRisk:
                  return '🔴 Critical Risk'
                default:
                  return null
              }
            })()}
          </p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      )
    default:
      throw new Error(`Unhandled discriminated union member`)
  }
}

export default EntryDetails
