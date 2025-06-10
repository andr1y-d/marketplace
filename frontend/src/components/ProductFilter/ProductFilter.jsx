import React from "react";
import s from './ProductFilter.module.scss';
import { ReactComponent as CategoryIcon } from "../../assets/categoryGrid.svg";

export const ProductFilter = () => {

  return (
    <div className={s.container}>
      <div className={s.filterContainer}>
        <div className={s.select}>
          <CategoryIcon className={s.icon}/>
          <select name="category" id="categoryFilter">
            <option value="a">Chose category</option>
            <option value="s">add</option>
            <option value="d">add</option>
          </select>
        </div>
        <div id="priceFilter" className={s.priceFilterContainer}>
          <input type="number" placeholder="Price from (USD)"/>

          <input type="number" placeholder="Price to (USD)"/>
        </div>
      </div>
    </div>
  )
}