import React from 'react';
import css from './PageTitle.module.css';

type Props = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: Props) {
  return <h1 className={css.title}>{children}</h1>;
}
