import React, {Fragment, useEffect, useState} from "react";
import { generatePath, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFavouriteButton } from "hooks/useFavouriteButton";

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

import { deleteProductFromList, destroyProduct, getProduct } from "store/product/productThunks";
import { BASE_URL } from "api/api";

import { routes } from "App";
import { Loader } from "components/Loader/Loader";
import { Carousel } from 'components/Carousel/Carousel';
import { SearchFilter } from "components/SearchFilter/SearchFilter";

import { ReactComponent as LocationIcon } from "assets/locationIcon.svg";
import { ReactComponent as AddToFavouritesIcon } from 'assets/Apiko Marketplace Shape.svg';
import noPhotoImg from "assets/noPhotoImg.jpg";

import s from './ProductView.module.scss';

export const ProductView = () => {
  let productPhotos = [];

  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const userId = useSelector(state => state.user.user?.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const [favouriteStyle, setFavouriteStyle] = useState(s.addToFavouritesIcon);

  const { handleClick } = useFavouriteButton({ product, setFavouriteStyle });

  const handleEdit = () => {
    alert('реалізувати')
  }

  const handleDelete = () => {
    dispatch(destroyProduct(product.id))
      .then(() => navigate(routes.home))
    dispatch(deleteProductFromList(product.id))
  }

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  if (product?.id) {
    try {
      productPhotos = JSON.parse(product.photos);
    } catch (e) {
      console.error("Cannot parse photos", e);
    }
  }

  dayjs.extend(isToday);

  const date = dayjs(product.updated_at);

  const formattedDate = date.isToday()
    ? `Today ${date.format('HH:mm')}`
    : date.format('DD.MM HH:mm');

  return (
    <Fragment>
      <SearchFilter/>
      <div className={s.viewContainer}>
        <div className={s.container}>
          {
            loading
            ?
              <Loader />
            :
            <>
              <div className={s.productContainer}>
                <div className={s.carousel}>
                  {
                    productPhotos
                      ?
                      <Carousel photos={productPhotos} price={product?.price}/>
                      :
                      <div className={s.productImgContainer}>
                        <img className={s.productImg} src={noPhotoImg} alt="img"/>
                      </div>
                  }
                </div>
                <div className={s.productInfoContainer}>
                  <div className={s.main}>
                    <div>{product?.title}</div>
                    <div>{formattedDate}</div>
                  </div>
                  <div className={s.location}>
                    <LocationIcon className={s.locationIcon}/>
                    {product?.location}
                  </div>
                  <hr/>
                  <div className={s.productDesc}>{product?.description}</div>
                </div>
              </div>
              <div className={s.userInfoContainer}>
                <div className={s.userCard}>
                  <div className={s.userCardHeader}>
                    <div className={s.userAvatar}>
                      {product.owner?.avatar && <img src={`${BASE_URL}/${product.owner?.avatar}`} alt="avatar"/>}
                    </div>
                  </div>
                  <div className={s.userInfo}>
                    <Link to={generatePath(routes.userProfile, {id: product.owner?.id || 0})}>{product.owner?.fullName}</Link>
                    <div>{product?.location}</div>
                  </div>
                </div>
                <div className={s.buttonsContainer}>
                  <div className={s.chat}>CHAT WITH SELLER</div>
                  <div className={s.addToFavourites} onClick={handleClick}>
                    <AddToFavouritesIcon className={favouriteStyle} />
                    ADD TO FAVOURITES
                  </div>
                </div>
                {
                  userId === product.owner?.id
                  &&
                  <div className={s.actionsOnProduct}>
                    <div className={s.edit} onClick={handleEdit}>EDIT</div>
                    <div className={s.delete} onClick={handleDelete}>DELETE</div>
                  </div>
                }
              </div>
            </>
          }
        </div>
      </div>
    </Fragment>
  );
};
