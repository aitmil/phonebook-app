import { Props } from '../../ts/types';
import css from './PageTitle.module.css';

export default function PageTitle({ children }: Props) {
  return <h1 className={css.title}>{children}</h1>;
}
