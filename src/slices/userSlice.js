import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  token: '',
  legal: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNew: (state, action) => {
      return { ...state, user: action.payload };
    },
    addToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    addLegal: (state, action) => {
      return { ...state, legal: action.payload };
    },
    logOut: (state) => {
      return { ...state, user: [], token: '', legal: [] };
    },
  },
});

export const { addNew, addToken, addLegal, logOut } = userSlice.actions;

export default userSlice.reducer;
