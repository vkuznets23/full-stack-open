import { Patient } from '../types/patients'
import { Gender } from '../utils'

const patients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    ssn: '123-45-6789',
    dateOfBirth: '1970-01-01',
    gender: Gender.Male,
    occupation: 'Engineer',
    entries: [
      {
        id: 'entry-1',
        date: '2020-01-01',
        type: 'Hospital',
        specialist: 'Dr. House',
        description: 'Patient had a broken leg.',
        diagnosisCodes: ['S62.5'],
        discharge: {
          date: '2020-01-15',
          criteria: 'Healed',
        },
      },
      {
        id: 'entry-2',
        date: '2022-05-10',
        type: 'OccupationalHealthcare',
        specialist: 'Dr. Strange',
        employerName: 'NYPD',
        description: 'Injured in the line of duty.',
        diagnosisCodes: ['Z57.1'],
        sickLeave: {
          startDate: '2022-05-10',
          endDate: '2022-05-20',
        },
      },
    ],
  },
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: Gender.Male,
    occupation: 'New york city cop',
    entries: [
      {
        id: 'entry-2',
        date: '2022-05-10',
        type: 'OccupationalHealthcare',
        specialist: 'Dr. Strange',
        employerName: 'NYPD',
        description: 'Injured in the line of duty.',
        diagnosisCodes: ['Z57.1'],
        sickLeave: {
          startDate: '2022-05-10',
          endDate: '2022-05-20',
        },
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-77A',
    gender: Gender.Male,
    occupation: 'Cop',
    entries: [
      {
        id: 'entry-3',
        date: '2023-03-15',
        type: 'HealthCheck',
        specialist: 'Dr. Feelgood',
        description: 'Annual check-up.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: Gender.Other,
    occupation: 'Technician',
    entries: [
      {
        id: 'entry-4',
        date: '2021-11-11',
        type: 'Hospital',
        specialist: 'Dr. Watson',
        description: 'Electric burn from machinery.',
        discharge: {
          date: '2021-11-20',
          criteria: 'Skin graft complete.',
        },
      },
    ],
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: Gender.Female,
    occupation: 'Forensic Pathologist',
    entries: [
      {
        id: 'entry-5',
        date: '2023-01-01',
        type: 'HealthCheck',
        specialist: 'Dr. Mulder',
        description: 'Routine health assessment.',
        healthCheckRating: 0,
      },
    ],
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: Gender.Male,
    occupation: 'Digital evangelist',
    entries: [
      {
        id: 'entry-6',
        date: '2024-02-02',
        type: 'OccupationalHealthcare',
        specialist: 'Dr. Developer',
        employerName: 'Fullstack Inc',
        description: 'RSI from keyboard usage.',
      },
    ],
  },
]

export default patients
