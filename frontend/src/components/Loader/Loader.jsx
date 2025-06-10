import React from "react";
import s from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.container}>
      <span className={s.loader}></span>
    </div>
  )
}