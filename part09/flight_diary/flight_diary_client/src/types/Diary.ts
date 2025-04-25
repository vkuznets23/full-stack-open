export interface Diary {
  id: number
  date: string
  weather: string
  visibility: string
}

export interface DiaryWithComment extends Diary {
  comment: string
}

export type createDiary = Omit<DiaryWithComment, 'id'>
