import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginView } from "./scenes/Auth/Login/LoginView";
import { RegisterView } from "./scenes/Auth/Register/RegisterView";
import { Header } from "./components/Header/Header";
import { loadUserFromToken } from "./store/auth/authThunks";
import {useDispatch, useSelector} from "react-redux";
import { HomeView } from "./scenes/Home/HomeView";
import { ProductView } from "./scenes/Product/ProductView";
import { ProfileView } from "./scenes/Profile/ProfileView";
import {EditProfile} from "./scenes/EditProfile/EditProfile";
import {getProducts} from "./store/product/productThunks";
import {FavouritesView} from "./scenes/Favourites/FavouritesView";
import {getUserFavourites} from "./store/favourites/favouritesThunks";

export const routes = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  auth: '/auth',
  inbox: '/inbox',
  product: `/products/:id`,
  userProfile: `/users/:id`,
  editProfile: '/edit/user/:id',
  editProduct: '/edit/product/:id',
  favourites: '/favourites'
}

export const App = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.user.isAuthenticated)

  useEffect( () => {
    dispatch(loadUserFromToken());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    isAuthorized && dispatch(getUserFavourites());
  }, [isAuthorized, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.home} element={<HomeView />} />
        <Route path={routes.login} element={<LoginView />} />
        <Route path={routes.register} element={<RegisterView />} />
        <Route path={routes.product} element={<ProductView />} />
        <Route path={routes.userProfile} element={<ProfileView />} />
        <Route path={routes.editProfile} element={<EditProfile />} />
        <Route path={routes.favourites} element={<FavouritesView />} />
      </Routes>
    </BrowserRouter>
  )
}