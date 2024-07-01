import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import { changeFilter } from '../../redux/filter/slice';
import { selectNameFilter } from '../../redux/filter/selectors';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const id = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className={css.box}>
      <MdSearch
        size={28}
        className={css.icon}
      />
      <input
        id={id}
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value.trim()))}
        className={css.input}
        placeholder='Search contact...'
      />
    </div>
  );
}
