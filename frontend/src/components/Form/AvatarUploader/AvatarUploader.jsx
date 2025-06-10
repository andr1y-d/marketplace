import React from "react";
import s from "./AvatarUploader.module.scss";
import {Field} from "formik";
import {useSelector} from "react-redux";
import {BASE_URL} from "../../../api/api";

export const AvatarUploader = ({formik, setAvatar, avatar}) => {
  const user = useSelector(state => state.user.user)

  return (
    <div className={s.userAvatar}>
      <div className={s.avatarContainer}>
        {
          avatar
            ? <img className={s.imgAvatar} src={URL.createObjectURL(avatar)} alt=""/>
            : user?.avatar && <img className={s.imgAvatar} src={`${BASE_URL}/${user.avatar}`} alt=""/>
        }
      </div>
      <label className={s.addPhotoContainer}>
        <span className={s.plusBtn}>Update photo</span>
        <Field name="avatar" type="file">
          {() => (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setAvatar(file);
                    formik.setFieldValue("avatar", file);
                  }
                }}
              />

            </>
          )}
        </Field>
      </label>
    </div>
  )
}