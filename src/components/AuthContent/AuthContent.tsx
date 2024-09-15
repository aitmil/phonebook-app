import React from 'react';
import css from './AuthContent.module.css';

const AuthContent: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Welcome!</h2>
      <p className={css.text}>Sign in to continue.</p>
    </div>
  );
};

export default AuthContent;
