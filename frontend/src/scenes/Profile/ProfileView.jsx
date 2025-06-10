import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SearchFilter} from "../../components/SearchFilter/SearchFilter";
import s from './ProfileView.module.scss'
import React, {useEffect, useState} from "react";
import {getUserProducts} from "../../store/product/productThunks";
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {getUserData} from "../../store/user/userThunks";
import {Loader} from "../../components/Loader/Loader";
import {BASE_URL} from "../../api/api";

export const ProfileView = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const userProducts = useSelector(state => state.product.userProducts)
  const user = useSelector(state => state.owner.user)
  const productLoading = useSelector(state => state.product.loading)
  const userLoading = useSelector(state => state.user.loading)

  const [feedbackPercent] = useState(Math.floor(Math.random() * (96 - 69) + 69));
  const [salesCount] = useState(Math.floor(Math.random() * (25 - 3) + 3));

  useEffect(() => {
    dispatch(getUserProducts(id))
    dispatch(getUserData(id))
  }, [dispatch, id]);

  return (
    <>
      <SearchFilter />
      <div className={s.view}>
        <div className={s.container}>
          {
            productLoading || userLoading
            ?
              <Loader />
            :
              <>
                <div className={s.userInfo}>
                  <div className={s.userAvatar}>
                    {
                      user.avatar !== null
                        && <img src={`${BASE_URL}/${user.avatar}`} alt="avatar"/>
                    }
                  </div>
                  <div className={s.userMeta}>
                    <div>{user.fullName}</div>
                    <div>{user.location || "Location.."}</div>
                  </div>
                  <div className={s.userStats}>
                    <div className={s.userStats_block}>
                      <div>{feedbackPercent}%</div>
                      <div>Positive feedback</div>
                    </div>
                    <div className={s.userStats_block}>
                      <div>{salesCount}</div>
                      <div>Sales</div>
                    </div>
                    <div className={s.userStats_block_active}>
                      <div>{userProducts.length}</div>
                      <div>Active listings</div>
                    </div>
                  </div>
                </div>
                <div className={s.userProductsList}>
                  {
                    userProducts.map((product, key) => <ProductCard key={key} product={product} />)
                  }
                </div>
              </>
          }
        </div>
      </div>
    </>
  )
}