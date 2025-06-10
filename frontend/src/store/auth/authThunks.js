import {createAsyncThunk} from "@reduxjs/toolkit";
import {loginUser, logoutUser, registerUser} from "../../api/auth";
import {editUser} from "../../api/user";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (user) => {
    return await loginUser(user);
  }
);

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (user) => {
    return await registerUser(user);
  }
);

export const userEdit = createAsyncThunk(
  "auth/userEdit",
  async (data) => {
    const token = localStorage.getItem('token');
    return await editUser(data, token)
  }
);

export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (token) => {
    await logoutUser(token);
    return token;
  }
);

export const loadUserFromToken = createAsyncThunk(
  'auth/loadUserFromToken',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) return thunkAPI.rejectWithValue('No token or user data');

    try {
      return {
        token,
        user: JSON.parse(user),
      };
    } catch (err) {
      return thunkAPI.rejectWithValue('Invalid stored data');
    }
  }
);