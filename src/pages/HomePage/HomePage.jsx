import HomeContent from '../../components/HomeContent/HomeContent';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <HomeContent />
      <img
        className={css.img}
        src='/img/home-phonebook.jpg'
        alt='phonebook image'
      ></img>
    </main>
  );
}
