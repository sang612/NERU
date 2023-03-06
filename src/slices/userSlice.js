import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  token: '',
  legal: [],
  imageList: {},
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
    addImage: (state, action) => {
      return { ...state, imageList: action.payload };
    },
  },
});

export const { addNew, addToken, addLegal, logOut, addImage } = userSlice.actions;

export default userSlice.reducer;
