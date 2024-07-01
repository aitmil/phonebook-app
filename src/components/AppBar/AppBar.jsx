import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import css from './AppBar.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <Logo />
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
