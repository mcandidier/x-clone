import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/libs/api";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setNotifications: (state, action) => action.payload,
    updateNotification: (state, action) => [action.payload, ...state],
    updateObject: (state, action) => {
      const { id, updatedData } = action.payload;
      const objectToUpdate = state.find(obj => obj.id === id);
      if (objectToUpdate) {
        Object.assign(objectToUpdate, updatedData);
      }
    },
  },
});

export const { 
    updateNotification,
    setNotifications,
    updateObject,
} = notificationSlice.actions;
