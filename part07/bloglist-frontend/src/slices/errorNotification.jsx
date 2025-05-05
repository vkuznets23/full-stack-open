import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.msg = action.payload;
    },
    clearError: (state) => {
      state.msg = "";
    },
  },
});

export const setErrorTimer = (text, seconds) => {
  return async (dispatch) => {
    dispatch(setError(text));
    setTimeout(() => {
      dispatch(clearError());
    }, seconds * 1000);
  };
};

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
