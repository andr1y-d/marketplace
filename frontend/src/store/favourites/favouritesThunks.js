import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  getFavourites,
  addToFavourites,
  deleteFavourite
} from "../../api/favourites";

export const getUserFavourites = createAsyncThunk(
  "favourites/getUserFavourites",
  async () => {
    const token = localStorage.getItem('token');
    return await getFavourites(token);
  }
);

export const addToUserFavourites = createAsyncThunk(
  "favourites/addToUserFavourites",
  async (data) => {
    const token = localStorage.getItem('token');
    return await addToFavourites(data, token);
  }
);

export const deleteFromUserFavourites = createAsyncThunk(
  "favourites/deleteFromUserFavourites",
  async (id) => {
    const token = localStorage.getItem('token');
    return await deleteFavourite(id, token);
  }
);

export const clearFavourites = createAsyncThunk(
  "favourites/clearFavourites",
  async () => {
    return true;
  }
);

