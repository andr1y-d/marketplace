import React from "react";
import s from './SearchFilter.module.scss'
import {ReactComponent as SearchIcon} from "../../assets/searchIcon.svg";
import {ReactComponent as LocationIcon} from "../../assets/locationIcon.svg";

export const SearchFilter = () => {
  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div>
          <div className={s.searchInputContainer}>
            <SearchIcon className={s.searchIcon} />
            <input className={s.searchInput} type="text" placeholder="Search product by name"/>
          </div>
          <div className={s.searchInputContainer}>
            <LocationIcon className={s.searchIcon} />
            <input className={s.searchInput} type="text" placeholder="Location"/>
          </div>
        </div>
        <button className={s.searchBtn}>SEARCH</button>
      </div>
    </div>
  )
}