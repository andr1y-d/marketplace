import React, {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import s from './HomeView.module.scss'
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {SearchFilter} from "../../components/SearchFilter/SearchFilter";
import {ProductFilter} from "../../components/ProductFilter/ProductFilter";
import {Loader} from "../../components/Loader/Loader";

export const HomeView = () => {
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)

  const products = useSelector(state => state.product.products);
  const searchFiltered = useSelector(state => state.product.filtered)
  const loading = useSelector(state => state.product.loading);

  const baseFiltered = category === ""
    ? products
    : products.filter(product => product.category === category);

  const priceFiltered = baseFiltered.filter(product =>
    Number(product.price) < maxPrice && Number(product.price) >= minPrice
  );

  const finalFiltered = searchFiltered !== null && searchFiltered !== undefined
    ? searchFiltered.filter(product =>
      Number(product.price) < maxPrice &&
      Number(product.price) >= minPrice &&
      (category === "" || product.category === category)
    )
    : priceFiltered;

  return (
    <Fragment>
      <SearchFilter />
      <ProductFilter setCategory={setCategory} setMaxPrice={setMaxPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} />
      {
        loading
          ?
          <Loader/>
          :
          <div className={s.homeContainer}>
            {finalFiltered.map((el, index) => (
              <ProductCard product={el} key={index} />
            ))}
          </div>
      }
    </Fragment>
  )
}