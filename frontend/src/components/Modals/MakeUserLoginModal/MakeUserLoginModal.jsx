import React, {useEffect} from "react";
import s from "./MakeUserLoginModal.module.scss";
import {Link} from "react-router-dom";
import {routes} from "../../../App";
import {ReactComponent as Icon} from 'assets/closeIcon.svg'

export const MakeUserLoginModal = ({ setOpen }) => {
  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 4000)
  }, []);

  return (
    <div className={s.modalContainer}>
      <div className={s.modal}>

        <Icon
          className={s.formCloseBtn}
          alt="close"
          onClick={() => {
            setOpen(false);
          }}
        />
        <div>
          <p>Unfortunately, only authorized users can list items for sale</p>
          <Link to={routes.login} onClick={() => {setOpen(false)}}>LOGIN NOW</Link>
        </div>
      </div>
    </div>
  )
}