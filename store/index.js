import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { currentUserSlice, fetchCurrentUser } from "./user-slice";
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    auth: currentUserSlice.reducer,
  },
  middleware: [thunk],
});


export default store;
