import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  getFavourites,
  addToFavourites,
  deleteFavourite
} from "../../api/favourites";

const token = localStorage.getItem('token');

export const getUserFavourites = createAsyncThunk(
  "favourites/getUserFavourites",
  async () => {
    return await getFavourites(token);
  }
);

export const addToUserFavourites = createAsyncThunk(
  "favourites/addToUserFavourites",
  async (data) => {
    return await addToFavourites(data, token);
  }
);

export const deleteFromUserFavourites = createAsyncThunk(
  "favourites/deleteFromUserFavourites",
  async (id) => {
    return await deleteFavourite(id, token);
  }
);