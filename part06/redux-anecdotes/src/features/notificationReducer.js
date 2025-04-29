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

export const setNotificationTimer = (text, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions
