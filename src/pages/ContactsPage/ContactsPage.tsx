import { useEffect, lazy, Suspense } from "react";
import { IoMdAdd } from "react-icons/io";

import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

import { useAppDispatch, useAppSelector } from "../../ts/hooks";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { openAddModal } from "../../redux/modal/slice";

import css from "./ContactsPage.module.css";

const ContactList = lazy(
  () => import("../../components/ContactList/ContactList")
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
      <div className={css.box}>
        <PageTitle>Contacts</PageTitle>
        <button
          type="button"
          className={css.btn}
          onClick={() => dispatch(openAddModal())}
        >
          <IoMdAdd size={48} />
          <span className="visually-hidden">Add Contact</span>
        </button>
      </div>
      <SearchBox />
      {isLoading && <Loader />}
      {isError && <Error />}
      <Suspense fallback={<Loader />}>
        <ContactList />
      </Suspense>
    </main>
  );
}
