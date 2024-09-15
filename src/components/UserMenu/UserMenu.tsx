import React from 'react';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { useAppDispatch, useAppSelector } from '../../ts/hooks';
import css from './UserMenu.module.css';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.text}>Welcome, {user.name}</p>
      <button
        className={css.btn}
        type='button'
        onClick={() => {
          dispatch(logOut());
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
