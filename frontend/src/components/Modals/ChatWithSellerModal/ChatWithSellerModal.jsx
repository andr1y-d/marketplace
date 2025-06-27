import React, {useState} from "react";

import { Header } from '../Header/Header'

import s from './ChatWithSellerModal.module.scss'
import {BASE_URL} from "api/api";

export const ChatWithSellerModal = ({ setOpen, title, subject, ownerName, ownerLocation, ownerAvatar }) => {
  const [text, setText] = useState('');

  const sendMessage = () => {

  }

  const handleInputChange = (evt) => {
    setText(evt.target.value)
  }

  return (
    <div className={s.modal}>
      <Header setOpen={setOpen} title={title} />
      <div className={s.container}>
        <div className={s.infoContainer}>
          <div className={s.subject}>Subject: <span className={s.title}>{subject}</span></div>
          <div className={s.ownerInfo}>
            <div className={s.userAvatar}>
              {
                ownerAvatar
                ?
                  <img src={`${BASE_URL}/${ownerAvatar}`} alt="avatar"/>
                :
                  <img src={require("assets/noPhotoImg.jpg")} alt="avatar"/>
              }
            </div>
            <div>
              <div className={s.userName}>{ownerName}</div>
              <div className={s.userLocation}>{ownerLocation}</div>
            </div>
          </div>
        </div>
        <div className={s.message}>
          MESSAGE
          <textarea
            cols="30"
            rows="10"
            placeholder='For example: Can i get more info on this?'
            onChange={evt => handleInputChange(evt)}
          />
        </div>
      </div>
      <button
        type='submit'
        onClick={sendMessage}
      >
        SUBMIT
      </button>
    </div>
  )
}