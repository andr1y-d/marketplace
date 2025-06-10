import {createSlice} from "@reduxjs/toolkit";
import {userRegister, userLogin, userLogout, userEdit, loadUserFromToken} from "./authThunks.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(userEdit.pending, (state) => {
        state.loading = true;
        state.user = {};
      })
      .addCase(userEdit.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        localStorage.setItem('user', JSON.stringify(action.payload));
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })


      .addCase(userLogout.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })


      .addCase(loadUserFromToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
