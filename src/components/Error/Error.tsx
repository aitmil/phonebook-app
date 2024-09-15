import React from 'react';
import { GiTerror } from 'react-icons/gi';
import { IoReload } from 'react-icons/io5';
import css from './Error.module.css';

const Loader: React.FC = () => {
  return (
    <div className={css.errorBox}>
      <GiTerror
        size={48}
        className={css.iconMain}
      />
      <div className={css.error}>
        <p className={css.text}>
          Ooops... Something went wrong! Try to reload this page
        </p>
        <IoReload />
      </div>
    </div>
  );
};

export default Loader;
