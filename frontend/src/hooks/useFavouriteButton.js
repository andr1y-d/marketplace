import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addToUserFavourites, deleteFromUserFavourites } from "../store/favourites/favouritesThunks";
import s1 from "scenes/Product/ProductView.module.scss";
import s2 from "components/ProductCard/ProductCard.module.scss";

export function useFavouriteButton({ product, setFavouriteStyle }) {
  const userId = useSelector(state => state.user.user?.id);
  const favouritesIds = useSelector(state => state.favourites.favourites);
  const isAuthorized = useSelector(state => state.user.isAuthenticated)

  const dispatch = useDispatch();

  useEffect(() => {
    setFavouriteStyle(
      favouritesIds.includes(product.id)
        ? `${s1.addToFavouritesActiveIcon} ${s2.addToFavouritesActiveIcon}`
        : `${s1.addToFavouritesIcon} ${s2.addToFavouritesIcon}`
    );
  }, [favouritesIds, product.id]);

  const handleUnauthorizedUserClick = () => {
    alert("реалізувати");
    // додавання до улюблених неавторизованим користувачам,
    // ідея щоб зберігати їх локально поки користувач не залогіниться,
    // після - перенести дані з localstorage в бд для користувача
  };

  const handleClick = () => {
    if (favouritesIds.includes(product.id)) {
      dispatch(deleteFromUserFavourites(product.id));
      setFavouriteStyle(`${s1.addToFavouritesIcon} ${s2.addToFavouritesIcon}`);
    } else {
      const data = { user_id: userId, product_id: product.id };
      if (isAuthorized) {
        dispatch(addToUserFavourites(data));
        setFavouriteStyle(`${s1.addToFavouritesActiveIcon} ${s2.addToFavouritesActiveIcon}`);
      } else {
        handleUnauthorizedUserClick();
      }
    }
  };

  return { handleClick };
}
