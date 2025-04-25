import { useEffect, useState } from 'react'
import { Diary } from './types/Diary'
import { Diaries, Form, ErrorMessage } from './components'
import diaryService from './services/diaryService'
import axios from 'axios'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  //form
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')

  //error
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll()
      setDiaries(diaries)
    }
    void fetchDiariesList()
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const newDiary = await diaryService.create({
        date,
        weather,
        visibility,
        comment,
      })
      setDiaries(diaries.concat(newDiary))

      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`Failed to create diary: ${err.response.data}`)
        setTimeout(() => setError(''), 5000)
      } else if (err instanceof Error) {
        setError(`Failed to create diary: ${err.message}`)
        setTimeout(() => setError(''), 5000)
      } else {
        setError('Unknown error occurred')
        setTimeout(() => setError(''), 5000)
      }
    }
  }

  return (
    <>
      {error && <ErrorMessage message={error} />}

      <Form
        handleSubmit={handleSubmit}
        date={date}
        setDate={setDate}
        weather={weather}
        setWeather={setWeather}
        visibility={visibility}
        setVisibility={setVisibility}
        comment={comment}
        setComment={setComment}
      />
      <Diaries diaries={diaries} />
    </>
  )
}

export default App
