import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <>
      <ThreeDots
        visible={true}
        height='100'
        width='100'
        color='#169c95'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperClass={css.loader}
      />
    </>
  );
};

export default Loader;
