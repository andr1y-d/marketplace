import React from "react";
import {ReactComponent as Icon} from 'assets/closeIcon.svg'

import s from './Header.module.scss'

export const Header = ({ setOpen , title }) => {
  return (
    <div className={s.formHeader}>
      <div>{title}</div>
      <Icon
        className={s.formCloseBtn}
        alt="close"
        onClick={() => {
          setOpen(false);
        }}
      />
    </div>
  )
}