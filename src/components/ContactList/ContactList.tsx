import React from 'react';
import { useAppSelector } from '../../ts/hooks';
import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalEdit from '../ModalEdit/ModalEdit';

const ContactList: React.FC = () => {
  const filteredContacts = useAppSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <li
            className={css.item}
            key={contact.id}
          >
            <Contact contact={contact} />
            <ModalDelete />
            <ModalEdit />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
