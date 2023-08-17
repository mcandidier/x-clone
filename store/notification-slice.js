import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/libs/api";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    updateNotification: (state, action) => [...state, action.payload],
  },
});

export const { 
    updateNotification
} = notificationSlice.actions;
