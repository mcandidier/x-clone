import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { currentUserSlice, fetchCurrentUser } from "./user-slice";
import { notificationSlice } from "./notification-slice";


import thunk from 'redux-thunk'


const store = configureStore({
  reducer: {
    auth: currentUserSlice.reducer,
    notification: notificationSlice.reducer,
  },
  middleware: [thunk],
});


export default store;
