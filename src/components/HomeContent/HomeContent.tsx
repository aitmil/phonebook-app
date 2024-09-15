import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHandHoldingHeart } from 'react-icons/fa';
import PageTitle from '../PageTitle/PageTitle';
import css from './HomeContent.module.css';

const HomeContent: React.FC = () => {
  return (
    <div className={css.content}>
      <PageTitle>Phonebook manager welcome page</PageTitle>
      <FaHandHoldingHeart
        size={36}
        className={css.icon}
      />
      <p className={css.text}>
        To get started, please{' '}
        <NavLink
          className={css.link}
          to='/login'
        >
          login
        </NavLink>{' '}
        !
      </p>
    </div>
  );
};

export default HomeContent;
