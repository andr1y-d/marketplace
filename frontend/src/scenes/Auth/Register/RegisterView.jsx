import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../App";
import { useDispatch } from "react-redux";
import {userRegister} from "../../../store/auth/authThunks";
import s from './Register.module.scss';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {Input} from "../../../components/Form/Input/Input";

export const RegisterView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (values) => {
    console.log(values)
    dispatch(userRegister(values))
      .unwrap()
      .then(() => {
        navigate('/auth/login');
      })
  }

  const handleValidateAndSubmit = async (e, formik) => {
    e.preventDefault();
    await formik.setTouched(
      { fullName: true, email: true, password: true },
      true
    );

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
    } else {
      formik.submitForm();
    }
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required(),
    email: Yup.string().email("wrong email").required(),
    password: Yup.string().min(6, "min 6 characters").required(),
  });

  return (
    <div className={s.container}>
      <div className={s.loginContainer}>
        <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          {(formik) => (
            <Form>
              <div>
                <Input name='fullName' type='fullName' label='FULL NAME' placeholder='Andrii Dolinovskyi' />
                <Input name='email' type='email' label='EMAIL' placeholder='example@gmail.com' />
                <Input name='password' type='password' label='PASSWORD' />
              </div>
              <button
                type="submit"
                onClick={(e) => handleValidateAndSubmit(e, formik)}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={s.toRegisterContainer}>
        I have account <Link to={routes.login} replace>LOGIN NOW</Link>
      </div>
    </div>
  );
}
