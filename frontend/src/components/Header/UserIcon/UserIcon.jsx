import React, {useEffect, useState} from 'react';
import s from './UserIcon.module.scss'
import {loadUserFromToken, userLogout} from "../../../store/auth/authThunks";
import {useDispatch, useSelector} from "react-redux";
  import {Link, useNavigate, generatePath} from "react-router-dom";
import {ReactComponent as User} from "../../../assets/userIcon.svg";
import {routes} from "../../../App";
import {BASE_URL} from "../../../api/api";

export const UserIcon = ({ color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parsedUser = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    dispatch(userLogout(token))
      .unwrap()
      .then(() => {
        navigate('/');
      })
  }

  const getFirstWord = (str = '') => str.split(' ')[0];
  const getEmail = (str = '') => str.split('@')[0];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={s.container}
    >
      {
        parsedUser?.avatar
          ? <img className={s.userIcon} src={`${BASE_URL}/${parsedUser?.avatar}`} alt="avatar"/>
          : <User className={s.userIcon} style={{ color: `${color}` }} />
      }

      {isHovered && (
        <div className={s.modal}>
          <div className={s.userProfileContainer}>
            <div className={s.userAvatar}>
              {
                parsedUser?.avatar
                  ? <img src={`${BASE_URL}/${parsedUser?.avatar}`} alt="avatar"/>
                  : parsedUser.fullName[0]
              }
            </div>
            <div className={s.userInfoContainer}>
              <div className={s.userInfo}>
                <p>{getFirstWord(parsedUser.fullName)}</p>
                <p>{getEmail(parsedUser.email)}</p>
              </div>
              <div className={s.userProfileBtn}>
                <Link to={generatePath(routes.userProfile, {id: parsedUser.id})}>Profile</Link>
              </div>
            </div>
          </div>
          <Link to={generatePath(routes.editProfile, {id: parsedUser.id})} className={s.editProfileBtn}>EDIT PROFILE</Link>
          <div className={s.buttonsContainer}>
            <Link to={routes.home} onClick={handleLogout}>LOGOUT</Link>
          </div>
        </div>
      )}
    </div>
);
};
