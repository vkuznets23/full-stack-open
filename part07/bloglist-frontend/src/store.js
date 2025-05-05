import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notification";
import errorReducer from "./slices/errorNotification";
import blogsReducer from "./slices/blogs";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});
