import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notification";
import errorReducer from "./slices/errorNotification";
import blogsReducer from "./slices/blogs";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
    blogs: blogsReducer,
  },
});
