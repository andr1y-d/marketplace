import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {ReactComponent as SearchIcon} from "assets/searchIcon.svg";
import {ReactComponent as LocationIcon} from "assets/locationIcon.svg";

import {clearFilter, filter} from "store/product/productSlice";

import s from './SearchFilter.module.scss'

export const SearchFilter = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const data = {
    name: searchFilter,
    location: locationFilter
  };

  const dispatch = useDispatch();

  const handleFilterChange = () => {
    if (data) {
      dispatch(filter(data))
    }
    else {
      dispatch(clearFilter());
    }
  };

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div>
          <div className={s.searchInputContainer}>
            <SearchIcon className={s.searchIcon} />
            <input
              className={s.searchInput}
              type="text"
              placeholder="Search product by name"

              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <div className={s.searchInputContainer}>
            <LocationIcon className={s.searchIcon} />
            <input
              className={s.searchInput}
              type="text"
              placeholder="Location"

              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
        </div>
        <button
          className={s.searchBtn}
          onClick={handleFilterChange}
        >
          SEARCH
        </button>
      </div>
    </div>
  )
}