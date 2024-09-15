import React from 'react';
import { useAppSelector } from '../../ts/hooks';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import css from './AppBar.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const AppBar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <Logo />
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
export default AppBar;
