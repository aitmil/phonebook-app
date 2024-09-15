import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useAppSelector } from '../../ts/hooks';
import css from './Navigation.module.css';

const Navigation: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink
        className={getLinkClass}
        to='/'
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={getLinkClass}
          to='/contacts'
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
