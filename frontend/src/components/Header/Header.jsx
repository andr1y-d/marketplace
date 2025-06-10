import React from "react";
import s from './Header.module.scss';
import {Link, matchPath, useLocation} from "react-router-dom";
import {routes} from "../../App";
import {useSelector} from "react-redux";
import {UserIcon} from "./UserIcon/UserIcon";
import {SellButton} from "./SellButton/SellButton";
import {ReactComponent as Favourites} from "../../assets/favourites.svg";

export const Header = () => {
  const isAuthorized = useSelector(state => state.user.isAuthenticated);
  const location = useLocation()

  const isMainPage = location.pathname === routes.home;
  const isProductPage = matchPath('/products/:id', location.pathname);
  const isUserPage = matchPath('/users/:id', location.pathname);
  const isFavouritesPage = location.pathname === routes.favourites;

  const titleClass = isMainPage || isProductPage || isUserPage || isFavouritesPage ? s.marketTitle : s.darkMarketTitle;
  const userClass = isMainPage || isProductPage || isUserPage || isFavouritesPage ? s.marketUserOpt : s.darkMarketUserOpt;
  const iconClass = isMainPage || isProductPage || isUserPage || isFavouritesPage ? 'white' : 'black';

  return (
    <div className={s.header}>
      <div className={titleClass}><Link to={routes.home}>MARKETPLACE</Link></div>
      <div className={userClass}>
        <SellButton />
        {isAuthorized
          ? <UserIcon color={iconClass} />
          : <Link to={routes.login}>Login</Link>
        }
        <Link className={s.favouritesIcon} to={routes.favourites}>
          <Favourites className={s.icon} />
        </Link>
      </div>
    </div>
  )
}