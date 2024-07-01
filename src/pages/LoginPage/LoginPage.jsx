import { NavLink } from 'react-router-dom';
import AuthContent from '../../components/AuthContent/AuthContent';
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <main className={css.container}>
      <AuthContent />
      <LoginForm />
      <p className={css.text}>
        Don't have an account?{' '}
        <NavLink
          className={css.link}
          to='/register'
        >
          Sign Up
        </NavLink>
      </p>
    </main>
  );
}
