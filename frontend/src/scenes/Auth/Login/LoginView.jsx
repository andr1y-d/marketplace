import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../App";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/auth/authThunks";
import s from './Login.module.scss';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {Input} from "../../../components/Form/Input/Input";
import {getUserFavourites} from "../../../store/favourites/favouritesThunks";

export const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    dispatch(userLogin(values))
      .unwrap()
      .then(() => {
        navigate('/');
        dispatch(getUserFavourites());
      })
  }

  const handleValidateAndSubmit = async (e, formik) => {
    e.preventDefault();
    await formik.setTouched(
      { email: true, password: true },
      true
    );

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
    } else {
      formik.submitForm();
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("wrong email").required("field is required"),
    password: Yup.string().min(6, "min 6 characters").required("field is required"),
  });

  return (
    <div className={s.container}>
      <div className={s.loginContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {(formik) => (
            <Form>
              <div>
                <Input name='email' type='email' label='EMAIL' placeholder='example@gmail.com' />
                <Input name='password' type='password' label='PASSWORD' />
              </div>

              <button
                type="submit"
                onClick={(e) => handleValidateAndSubmit(e, formik)}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={s.toRegisterContainer}>
        I have no account <Link to={routes.register} replace>REGISTER NOW</Link>
      </div>
    </div>
  );
}
