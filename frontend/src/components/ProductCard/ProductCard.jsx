import React, {useEffect, useState} from "react";
import s from './ProductCard.module.scss'
import { ReactComponent as AddToFavouritesIcon } from 'assets/Apiko Marketplace Shape.svg';
import { BASE_URL } from "api/api";
import {generatePath, Link} from "react-router-dom";
import { routes } from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {
  addToUserFavourites,
  deleteFromUserFavourites,
} from "../../store/favourites/favouritesThunks";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const photos = product.photos ? JSON.parse(product.photos) : [];
  const userId = useSelector(state => state.user.user?.id);
  const favouritesIds = useSelector(state => state.favourites.favourites);

  const [favouriteStyle, setFavouriteStyle] = useState(s.addToFavouritesIcon);

  useEffect(() => {
    setFavouriteStyle(
      favouritesIds.includes(product.id)
        ? s.addToFavouritesActiveIcon
        : s.addToFavouritesIcon
    )
  }, [favouritesIds]);

  const handleClick = () => {
    if(favouritesIds.includes(product.id)) {
      dispatch(deleteFromUserFavourites(product.id));
      setFavouriteStyle(s.addToFavouritesIcon);
    } else {
      const data = {
        "user_id": userId,
        "product_id": product.id,
      }
      dispatch(addToUserFavourites(data));
      setFavouriteStyle(s.addToFavouritesActiveIcon);
    }
  }

  return  (
    <div className={s.card}>
      <div className={s.photoContainer}>
        {
          photos.length > 0 ? (
            <Link to={generatePath(routes.product, {id: product.id})}><img className={s.productPhoto} src={`${BASE_URL}/${photos[0]}`} alt='photo' /></Link>
          ) : (
            <Link to={generatePath(routes.product, {id: product.id})}><img className={s.productPhoto} src={require('assets/noPhotoImg.jpg')} alt="empty"/></Link>
        )}
      </div>

      <div className={s.productInfo}>
        <div>
          <Link to={generatePath(routes.product, {id: product.id})}>{product.title}</Link>
          <div>${product.price}</div>
        </div>
        <AddToFavouritesIcon
          className={favouriteStyle}
          onClick={() => handleClick()}
        />
      </div>
    </div>
  )
}