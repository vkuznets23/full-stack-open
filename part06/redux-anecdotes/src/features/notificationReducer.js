import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = ''
    },
  },
})

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions
