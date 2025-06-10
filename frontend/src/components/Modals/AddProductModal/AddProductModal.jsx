import React, {useState} from "react";
import {Form, Formik} from "formik";
import {Input} from "../../Form/Input/Input";
import s from './AddProductModal.module.scss'
import * as Yup from "yup";
import {Header} from './Header/Header'
import {createProduct} from "../../../store/product/productThunks";
import {useDispatch} from "react-redux";
import PhotoUploader from "../../Form/PhotoUploader/PhotoUploader";

export const AddProductModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);

  const handleValidateAndSubmit = async (e, formik) => {
    e.preventDefault();
    await formik.setTouched(
      { title: true, location: true, description: true, photos: true, price: true },
      true
    );

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
    } else {
      formik.submitForm();
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    location: Yup.string().required(),
    description: Yup.string().required(),
    photos: Yup.array(),
    price: Yup.number().required(),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("price", values.price);

    photos.forEach((file) => {
      formData.append("images[]", file);
    });

    dispatch(createProduct(formData))
  };

  return (
    <div className={s.modal}>
      <Header setOpen={setOpen} />
      <Formik
        initialValues={{ title: "", location: "", description: "", photos: [], price: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values)
          setOpen(false);
        }}
      >
        {(formik) => (
          <Form>
            <div className={s.inputs}>
              <Input name='title' type='text' label='TITLE' placeholder='For example: Computer' />
              <Input name='location' type='text' label='LOCATION' placeholder='For example: LA, California' />
              <Input name='description' type='text' label='DESCRIPTION' tp='big' placeholder='About product' />
              <PhotoUploader label='PHOTOS' setPhotos={setPhotos} photos={photos} />
              <Input name='price' type='number' label='PRICE' placeholder='For example: 100 bananas' />
            </div>
            <button
              className={s.submitSellButton}
              type="submit"
              onClick={(e) => handleValidateAndSubmit(e, formik)}
            >
              SUBMIT
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}