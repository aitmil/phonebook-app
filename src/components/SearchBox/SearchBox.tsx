import React from 'react';
import { useId } from 'react';
import { MdSearch } from 'react-icons/md';

import { changeFilter } from '../../redux/filter/slice';
import { selectNameFilter } from '../../redux/filter/selectors';
import { useAppDispatch, useAppSelector } from '../../ts/hooks';
import css from './SearchBox.module.css';

const SearchBox: React.FC = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectNameFilter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter(e.target.value.trim()));
  };

  return (
    <div className={css.box}>
      <MdSearch
        size={28}
        className={css.icon}
      />
      <input
        id={id}
        value={filter}
        onChange={handleChange}
        className={css.input}
        placeholder='Search contact...'
      />
    </div>
  );
};

export default SearchBox;
