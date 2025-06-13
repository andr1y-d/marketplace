import React from "react";
import {Field} from "formik";

import { ReactComponent as CategoryIcon } from "assets/categoryGrid.svg";

import s from "../../Modals/AddProductModal/AddProductModal.module.scss";

export const SelectCategory = ({ name ,label, setCategory, category, initVal }) => {
  const redBorderStyle = {
    border: "1px solid red",
    outline: "none",
    boxSizing: "border-box",
  };

  const normalStyle = {
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
  };

  const handleChanges = (e) => {
    const newValue = e.target.value;
    setCategory(newValue)
  };

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <label htmlFor="categoryFilter">
          {label}
          <div className={s.select} style={meta.touched && meta.error ? redBorderStyle : normalStyle}>
            <CategoryIcon className={s.icon} />
            <select id="categoryFilter" {...field} value={category ? category : initVal} onChange={handleChanges}>
              <option value="" hidden>Choose category</option>
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
        </label>
      )}
    </Field>
  )
}