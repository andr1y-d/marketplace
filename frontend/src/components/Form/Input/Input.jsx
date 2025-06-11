import React from "react";
import s from './Input.module.scss'
import {Field} from "formik";

export const Input = ({label, name, type, tp, ...props}) => {

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

  return (
    <label>
      {label}
      {
        tp
        ?
        <Field name={name}>
          {({ field, meta }) => (
            <>
              <textarea
                {...field}
                {...props}
                className={`${s.inputField} ${s[tp]}`}
                style={meta.touched && meta.error ? redBorderStyle : normalStyle}
              />
            </>
          )}
        </Field>
        :
        <Field name={name} type={type}>
          {({ field, meta }) => (
            <>
              <input
                {...field}
                {...props}
                type={type}
                className={`${s.inputField}`}
                style={meta.touched && meta.error ? redBorderStyle : normalStyle}
              />
            </>
          )}
        </Field>
      }
    </label>
  )
}