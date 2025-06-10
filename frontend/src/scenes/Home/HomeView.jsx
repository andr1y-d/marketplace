import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import s from './HomeView.module.scss'
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {SearchFilter} from "../../components/SearchFilter/SearchFilter";
import {ProductFilter} from "../../components/ProductFilter/ProductFilter";
import {Loader} from "../../components/Loader/Loader";

export const HomeView = () => {
  const products = useSelector(state => state.product.products);
  const loading = useSelector(state => state.product.loading);

  return (
    <Fragment>
      <SearchFilter />
      <ProductFilter />
      {
        loading
          ?
          <Loader/>
          :
          <div className={s.homeContainer}>
            {products.map((el, index) => (
              <ProductCard product={el} key={index} />
            ))}
          </div>
      }
    </Fragment>
  )
}