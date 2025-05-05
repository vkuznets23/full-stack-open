import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.msg = action.payload;
    },
    clearNotification: (state) => {
      state.msg = "";
    },
  },
});

export const setNotificationTimer = (text, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
