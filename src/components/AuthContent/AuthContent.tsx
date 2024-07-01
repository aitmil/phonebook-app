import css from './AuthContent.module.css';

export default function AuthContent() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Welcome!</h2>
      <p className={css.text}>Sign in to continue.</p>
    </div>
  );
}
