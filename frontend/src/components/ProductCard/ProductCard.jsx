import React, { useEffect, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { BASE_URL } from "api/api";
import { routes } from "../../App";

import { useFavouriteButton } from "../../hooks/useFavouriteButton";

import { ReactComponent as AddToFavouritesIcon } from 'assets/Apiko Marketplace Shape.svg';

import s from './ProductCard.module.scss'

export const ProductCard = ({ product }) => {
  const photos = product.photos ? JSON.parse(product.photos) : [];

  const [favouriteStyle, setFavouriteStyle] = useState(s.addToFavouritesIcon);

  const favouritesIds = useSelector(state => state.favourites.favourites);

  const { handleClick } = useFavouriteButton({ product, setFavouriteStyle });

  useEffect(() => {
    setFavouriteStyle(
      favouritesIds.includes(product.id)
        ? s.addToFavouritesActiveIcon
        : s.addToFavouritesIcon
    )
  }, [favouritesIds, product]);

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