import { createSlice } from '@reduxjs/toolkit';
import {
  addToUserFavourites, getUserFavourites, deleteFromUserFavourites, clearFavourites
} from './favouritesThunks';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFavourites.pending, (state) => {
        state.loading = true;
        state.favourites = [];
      })
      .addCase(getUserFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload.favourites;
      })

      .addCase(addToUserFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites.push(action.payload[0].product_id)
      })

      .addCase(deleteFromUserFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = state.favourites.filter(id => id !== action.payload);
      })

      .addCase(clearFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = [];
      })
  }
});

export default favouritesSlice.reducer;
