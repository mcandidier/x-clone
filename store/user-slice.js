import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/libs/api";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    setCurrentUser: (state, action) => action.payload,
    clearCurrentUser: (state) => null,
  },
});


export const fetchCurrentUser = () => (dispatch) => {
   API.get("api/profiles/").then(res => {
        dispatch(setCurrentUser(res.data));
    });
}

export const { 
    setCurrentUser
} = currentUserSlice.actions;
