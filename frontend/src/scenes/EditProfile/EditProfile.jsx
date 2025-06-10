import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {generatePath, useNavigate} from "react-router-dom";
import {userEdit} from "../../store/auth/authThunks";
import * as Yup from "yup";
import s from "./EditProfile.module.scss";
import {Form, Formik} from "formik";
import {Input} from "../../components/Form/Input/Input";
import {routes} from "../../App";
import {AvatarUploader} from "../../components/Form/AvatarUploader/AvatarUploader";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  const parsedUser = useSelector(state => state.user.user)

  const handleChanges = (values) => {
    values.id = parsedUser.id;
    dispatch(userEdit(values))
      .then(() => navigate(generatePath(routes.userProfile, {id: parsedUser.id})))
  }

  const handleValidateAndSubmit = async (e, formik) => {
    e.preventDefault();
    await formik.setTouched(
      { fullName: true, phone: true },
      true
    );

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
    } else {
      formik.submitForm();
    }
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().min(3).nullable(),
    phone: Yup.string().min(10, "min 10 characters").max(12, "max 12 characters").nullable(),
    avatar: Yup.mixed().nullable(),
  });

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <div>Edit Profile</div>
        <Formik
          initialValues={{ fullName: "", phone: "", avatar: null }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleChanges(values)}
        >
          {(formik) => (
            <Form>
              <AvatarUploader formik={formik} setAvatar={setAvatar} avatar={avatar} />
              <div>
                <Input name='fullName' type='text' label='FULL NAME' placeholder='Andrii Dolinovskyi' />
                <Input name='phone' type='text' label='PHONE' placeholder='+380 99 999 9999' />
              </div>

              <button
                type="submit"
                onClick={(e) => handleValidateAndSubmit(e, formik)}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}