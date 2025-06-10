import { configureStore } from "@reduxjs/toolkit";
import userReducer from './auth/authSlice.js'
import productReducer from './product/productSlice.js'
import sellerReducer from './user/userSlice.js'
import favouritesReducer from "./favourites/favouritesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    owner: sellerReducer,
    favourites: favouritesReducer,
  }
})