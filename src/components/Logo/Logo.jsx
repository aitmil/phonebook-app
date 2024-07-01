import { GiNotebook } from 'react-icons/gi';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <div className={css.wrapper}>
      <GiNotebook size={36} />
      <p className={css.text}>Phonebook</p>
    </div>
  );
}
