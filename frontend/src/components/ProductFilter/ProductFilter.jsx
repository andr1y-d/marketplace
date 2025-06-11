import React, {useEffect} from "react";
import s from './ProductFilter.module.scss';
import { ReactComponent as CategoryIcon } from "assets/categoryGrid.svg";

export const ProductFilter = ({ setCategory, setMinPrice, setMaxPrice, maxPrice }) => {
  const handleSelectChange = (e) => {
    setCategory(e.target.value)
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value)
  }

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value)
  }

  useEffect(() => {
    if (!maxPrice) {
      setMaxPrice(Infinity)
    }
  }, [maxPrice]);

  return (
    <div className={s.container}>
      <div className={s.filterContainer}>
        <div className={s.select}>
          <CategoryIcon className={s.icon}/>
          <select name="category" id="categoryFilter" onChange={handleSelectChange}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Toys">Toys</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Health Care">Health Care</option>
          </select>
        </div>
        <div id="priceFilter" className={s.priceFilterContainer}>
          <input type="number" placeholder="Price from (USD)" min="0" onChange={handleMinPriceChange}/>
          <input type="number" placeholder="Price to (USD)" min="0" onChange={handleMaxPriceChange}/>
        </div>
      </div>
    </div>
  )
}