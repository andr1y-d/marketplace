import React, { Fragment, useEffect } from "react";
import {generatePath, Link, useParams} from "react-router-dom";
import { getProduct } from "../../store/product/productThunks";
import { useDispatch, useSelector } from "react-redux";
import s from './ProductView.module.scss';
import { Carousel } from 'components/Carousel/Carousel';
import { SearchFilter } from "../../components/SearchFilter/SearchFilter";
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { ReactComponent as LocationIcon } from "../../assets/locationIcon.svg";
import { ReactComponent as AddToFavouritesIcon } from 'assets/Apiko Marketplace Shape.svg';
import { routes } from "../../App";
import noPhotoImg from "../../assets/noPhotoImg.jpg";
import {Loader} from "../../components/Loader/Loader";
import {BASE_URL} from "../../api/api";

export const ProductView = () => {
  let productPhotos = [];
  let productPrice = null;
  let productDesc = null;
  let productTitle = null;
  let productDeploy = null;
  let productLocation = null;

  let ownerId = null;
  let ownerName = null;
  let ownerAvatar = null;

  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  if (product?.id) {
    try {
      productPhotos = JSON.parse(product.photos);
      productPrice = product.price;
      productDesc = product.description;
      productTitle = product.title;
      productDeploy = product.updated_at;
      productLocation = product.location;
      ownerId = product.owner.id;
      ownerName = product.owner.fullName;
      ownerAvatar = product.owner.avatar;
    } catch (e) {
      console.error("Cannot parse string into array:", e);
    }
  }

  dayjs.extend(isToday);

  const date = dayjs(productDeploy);

  const formattedDate = date.isToday()
    ? `Today ${date.format('HH:mm')}`
    : date.format('DD.MM HH:mm');

  const handleClick = (e) => {
    const el = e.target;
    const paths = el.querySelectorAll('path');

    paths.forEach(path => {
      path.style.fill = '#349a89';
      path.style.stroke = '#349a89';
    });
  }

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
                      <Carousel photos={productPhotos} price={productPrice}/>
                      :
                      <div className={s.productImgContainer}>
                        <img className={s.productImg} src={noPhotoImg} alt="img"/>
                      </div>
                  }
                </div>
                <div className={s.productInfoContainer}>
                  <div className={s.main}>
                    <div>{productTitle}</div>
                    <div>{formattedDate}</div>
                  </div>
                  <div className={s.location}>
                    <LocationIcon className={s.locationIcon}/>
                    {productLocation}
                  </div>
                  <hr/>
                  <div className={s.productDesc}>{productDesc}</div>
                </div>
              </div>
              <div className={s.userInfoContainer}>
                <div className={s.userCard}>
                  <div className={s.userCardHeader}>
                    <div className={s.userAvatar}>
                      {ownerAvatar && <img src={`${BASE_URL}/${ownerAvatar}`} alt="avatar"/>}
                    </div>
                  </div>
                  <div className={s.userInfo}>
                    <Link to={generatePath(routes.userProfile, {id: ownerId || 0})}>{ownerName}</Link>
                    <div>{productLocation}</div>
                  </div>
                </div>
                <div className={s.buttonsContainer}>
                  <div className={s.chat}>CHAT WITH SELLER</div>
                  <div className={s.addToFavourites} onClick={(e) => handleClick(e)}>
                    <AddToFavouritesIcon className={s.addToFavouritesIcon} />
                    ADD TO FAVOURITES
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </Fragment>
  );
};
