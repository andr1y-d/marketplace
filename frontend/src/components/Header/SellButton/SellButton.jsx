import React, { useState } from 'react';
import {AddProductModal} from "../../Modals/AddProductModal/AddProductModal";
import {useSelector} from "react-redux";
import {MakeUserLoginModal} from "../../Modals/MakeUserLoginModal/MakeUserLoginModal";
import s from './SellButton.module.scss'

export const SellButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthorized = useSelector(state => state.user.isAuthenticated);

  return (
    <div>
      <button className={s.button} onClick={() => setIsOpen(true)}>SELL</button>
      {
        isOpen
        &&
        (
          isAuthorized
            ? <AddProductModal setOpen={setIsOpen} title="Add product" type="add" />
            : <MakeUserLoginModal setOpen={setIsOpen} />
        )
      }
    </div>
  );
};
