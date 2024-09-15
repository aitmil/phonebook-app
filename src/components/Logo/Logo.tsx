import React from 'react';
import { GiNotebook } from 'react-icons/gi';
import css from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <GiNotebook size={36} />
      <p className={css.text}>Phonebook</p>
    </div>
  );
};

export default Logo;
