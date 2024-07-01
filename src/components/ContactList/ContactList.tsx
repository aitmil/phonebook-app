import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <li
            className={css.item}
            key={contact.id}
          >
            <Contact contact={contact} />
            <ModalDelete contact={contact} />
            <ModalEdit contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
}
