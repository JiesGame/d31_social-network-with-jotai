import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      username: Cookies.get('username') || "",
      email: Cookies.get('email') || "",
      description: Cookies.get('description') || "",
      id: Cookies.get('id') || "",
      }
    },
  reducers: {
    changeProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeProfile } = userSlice.actions;


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  }
})
