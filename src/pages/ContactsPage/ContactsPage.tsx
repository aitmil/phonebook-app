import { useEffect, lazy, Suspense } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import ContactEditor from '../../components/ContactEditor/ContactEditor';
import SearchBox from '../../components/SearchBox/SearchBox';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectError, selectLoading } from '../../redux/contacts/selectors';
import { useAppDispatch, useAppSelector } from '../../ts/hooks';
import css from './ContactsPage.module.css';

const ContactList = lazy(
  () => import('../../components/ContactList/ContactList')
);

export default function ContactsPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const isError = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <main className={css.container}>
      <div className={css.boxEdit}>
        <PageTitle>Your contacts</PageTitle>
        <ContactEditor />
      </div>
      <div className={css.wrapper}>
        <SearchBox />
        {isLoading && <Loader />}
        {isError && <Error />}
        <Suspense fallback={<Loader />}>
          <ContactList />
        </Suspense>
      </div>
    </main>
  );
}
