import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getLinkClass = ({ isActive }) => {
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
}
