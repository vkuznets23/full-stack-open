import { createDiary, Diary, DiaryWithComment } from '../types/Diary'
import axios from 'axios'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`)

  return data
}

const create = async (object: createDiary) => {
  console.log('Sending to backend:', object)
  const { data } = await axios.post<DiaryWithComment>(
    `${apiBaseUrl}/diaries`,
    object
  )

  return data
}

export default { getAll, create }
