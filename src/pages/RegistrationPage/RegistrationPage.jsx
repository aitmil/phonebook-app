import AuthContent from '../../components/AuthContent/AuthContent';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './RegistrationPage.module.css';

export default function LoginPage() {
  return (
    <main className={css.container}>
      <AuthContent />
      <RegistrationForm />
    </main>
  );
}
