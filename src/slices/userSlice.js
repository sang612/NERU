import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNew: (state, action) => {
      return { ...state, user: action.payload };
    },
    addToken: (state, action) => {
      return { ...state, token: action.payload };
    },
  },
});

export const { addNew, addToken } = userSlice.actions;

export default userSlice.reducer;
