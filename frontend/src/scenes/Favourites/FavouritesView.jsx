import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {SearchFilter} from "components/SearchFilter/SearchFilter";
import {ProductCard} from "components/ProductCard/ProductCard";
import {Loader} from "components/Loader/Loader";

import s from "./FavouritesView.module.scss";

export const FavouritesView = () => {
  const products = useSelector(state => state.product.products);

  const favouritesIds = useSelector(state => state.favourites.favourites);
  const favouritesSet = new Set(favouritesIds);

  const [favourites, setFavourites] = useState([]);

  const loading = useSelector(state => state.favourites.loading);

  useEffect(() => {
    setFavourites(products.filter(product => favouritesSet.has(product.id)))
  }, [favouritesIds, products]);

  return (
    <Fragment>
      <SearchFilter />
      {
        loading
          ?
          <Loader/>
          :
          <div className={s.container}>
            <div className={s.title}>SAVED ITEMS <span>({favourites?.length})</span></div>
            <div className={s.productsContainer}>
              {favourites.map((el, index) => (
                <ProductCard product={el} key={index} />
              ))}
            </div>
          </div>
      }
    </Fragment>
  )
}