import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import {changeProduct, createProduct, getProduct} from "store/product/productThunks";

import { Form, Formik } from "formik";

import { Header } from '../Header/Header'
import { PhotoUploader } from "../../Form/PhotoUploader/PhotoUploader";
import { Input } from "../../Form/Input/Input";
import { SelectCategory } from "../../Form/SelectCategory/SelectCategory";

import s from './AddProductModal.module.scss'
import {BASE_URL} from "../../../api/api";

export const AddProductModal = ({ setOpen, title, type, id, product }) => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [oldPhotos, setOldPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);

  const handleValidateAndSubmit = async (e, formik) => {
    e.preventDefault();
    await formik.setTouched(
      { title: true, category: true, location: true, description: true, photos: true, price: true },
      true
    );

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
    } else {
      formik.submitForm();
    }
  };

  const validationSchema = () => {
    switch (type) {
      case 'add': {
        return Yup.object({
          title: Yup.string().required(),
          category: Yup.string(),
          location: Yup.string().required(),
          description: Yup.string().required(),
          price: Yup.number().required(),
        });
      }
      case 'edit': {
        return Yup.object({
          title: Yup.string().required(),
          category: Yup.string(),
          location: Yup.string().required(),
          description: Yup.string().required(),
          price: Yup.string().required(),
        });
      }
    }
  }

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category || category);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("price", values.price);

    oldPhotos.forEach(photo => {
      formData.append('oldPhotos[]', photo);
    });
    newPhotos.forEach(photo => {
      formData.append('newPhotos[]', photo);
    });

    switch (type) {
      case 'add': {
        dispatch(createProduct(formData));
        break;
      }
      case 'edit': {
        const data = {
          data: formData,
          id: id,
        }

        dispatch(changeProduct(data))
          .then(() => dispatch(getProduct(id)))
      }
    }
  };

  const initialValues = () => {
    switch (type) {
      case 'add': {
        return {
          title: "",
          category: "",
          location: "",
          description: "",
          price: ""
        }
      }
      case 'edit': {
        return {
          title: product.title,
          category: category || product.category,
          location: product.location,
          description: product.description,
          price: product.price,
          oldPhotos: product.photos || [],
          newPhotos: []
        }
      }
    }
  }

  return (
    <div className={s.modal}>
      <Header setOpen={setOpen} title={title} />
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema()}
        onSubmit={async (values) => {
          await handleSubmit(values)
          setOpen(false);
        }}
      >
        {(formik) => (
          <Form>
            <div className={s.inputs}>
              <Input name='title' type='text' label='TITLE' placeholder='For example: Computer' />
              <SelectCategory name='category' label='CATEGORY' category={category} initVal={product?.category} setCategory={setCategory} />
              <Input name='location' type='text' label='LOCATION' placeholder='For example: LA, California' />
              <Input name='description' type='text' label='DESCRIPTION' tp='big' placeholder='About product' />
              <PhotoUploader
                label='PHOTOS'
                setOldPhotos={setOldPhotos}
                oldPhotos={oldPhotos}
                setNewPhotos={setNewPhotos}
                newPhotos={newPhotos}
                initVal={product?.photos}
                formik={formik}
                type={type} />
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