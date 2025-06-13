import React, { useEffect } from 'react';
import s from './PhotoUploader.module.scss';
import { BASE_URL } from "../../../api/api";

export const PhotoUploader = ({ label, formik, initVal = [], type, ...photos }) => {
  const {oldPhotos, setOldPhotos, newPhotos, setNewPhotos} = photos

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...oldPhotos, ...newPhotos, ...files];
    if (combined.length > 6) return;

    const updatedNew = [...newPhotos, ...files];
    setNewPhotos(updatedNew);
    formik.setFieldValue('newPhotos', updatedNew);
    formik.setFieldValue('oldPhotos', oldPhotos);
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    const total = [...oldPhotos, ...newPhotos];
    const item = total[index];

    if (typeof item === 'string') {
      const updatedOld = oldPhotos.filter((_, i) => i !== index);
      setOldPhotos(updatedOld);
      formik.setFieldValue('oldPhotos', updatedOld);
    } else {
      const updatedNew = newPhotos.filter((_, i) => oldPhotos.length + i !== index);
      setNewPhotos(updatedNew);
      formik.setFieldValue('newPhotos', updatedNew);
    }
  };

  const combinedPhotos = [...oldPhotos, ...newPhotos];

  const getPreview = (photo) =>
    typeof photo === 'string' ? BASE_URL + '/' + photo : URL.createObjectURL(photo);

  useEffect(() => {
    setOldPhotos(() => type === 'edit' && initVal ? JSON.parse(initVal) : [])
  }, []);

  return (
    <div className={s.uploaderContainer}>
      <label>{label}</label>
      <div className={s.photoList}>
        {combinedPhotos.map((photo, index) => (
          <div className={s.photoBox} key={index}>
            <img src={getPreview(photo)} alt={`photo-${index}`} />
            <button className={s.removeBtn} onClick={(e) => handleRemove(e, index)}>×</button>
          </div>
        ))}
        {combinedPhotos.length < 6 && (
          <label className={s.addPhotoContainer}>
            <span className={s.plusBtn}>+</span>
            <input type="file" accept="image/*" multiple onChange={handlePhotoChange} />
          </label>
        )}
      </div>
    </div>
  );
};
