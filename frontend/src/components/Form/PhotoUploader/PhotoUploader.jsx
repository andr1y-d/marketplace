import React from 'react';
import s from './PhotoUploader.module.scss'

const PhotoUploader = ({ label, setPhotos, photos }) => {
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files].slice(0, 6);
    setPhotos(newPhotos);
  };

  const handleRemove = (e, index) => {
    e.preventDefault()
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
  };

  return (
    <div className={s.uploaderContainer}>
      <label>
        {label}
      </label>
      <div className={s.photoList}>
        {photos.length < 6 && (
          <>
            {photos.map((photo, index) => (
              <div className={s.photoBox} key={index}>
                <img src={URL.createObjectURL(photo)} alt={`photo-${index}`}/>
                <button className={s.removeBtn} onClick={(e) => handleRemove(e, index)}>×</button>
              </div>
            ))}
            <label className={s.addPhotoContainer}>
              <span className={s.plusBtn}>+</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
              />
            </label>
          </>
        )}
      </div>
    </div>

  );
};

export default PhotoUploader;
