import { createSlice } from '@reduxjs/toolkit';
import {
  getUserData
} from './userThunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.user = {};
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
  }
});

export default userSlice.reducer;
