import React from "react";
import s from './Header.module.scss'

export const Header = ({ setOpen , title }) => {
  return (
    <div className={s.formHeader}>
      <div>{title}</div>
      <img
        className={s.formCloseBtn}
        src={require('../../../../assets/closeIcon.png')}
        alt="close"
        onClick={() => {
          setOpen(false);
        }}
      />
    </div>
  )
}