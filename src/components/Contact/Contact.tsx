import { useAppDispatch, useAppSelector } from '../../ts/hooks';
import { ContactProps } from '../../ts/types';

import { IoPerson } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';

import { openDeleteModal, openEditModal } from '../../redux/modal/slice';
import { selectContactById } from '../../redux/contacts/selectors';

import clsx from 'clsx';
import css from './Contact.module.css';

const Contact: React.FC<ContactProps> = ({ contact: { id, name, number } }) => {
  const dispatch = useAppDispatch();

  const activeContact = useAppSelector(state => selectContactById(state, id));

  const handleEditClick = () => {
    if (activeContact) {
      dispatch(openEditModal(activeContact));
    }
  };

  const handleDeleteClick = () => {
    if (activeContact) {
      dispatch(openDeleteModal(activeContact));
    }
  };

  return (
    <>
      <div className={css.contactBox}>
        <div className={css.nameBox}>
          <IoPerson size={30} />
          <h2 className={css.name}>{name}</h2>
        </div>
        <div className={css.numberBox}>
          <FaPhone size={30} />
          <p className={css.number}>{number}</p>
        </div>
      </div>
      <div className={css.btnWrapper}>
        <button
          type='button'
          className={clsx(css.btn, css.editBtn)}
          onClick={handleEditClick}
        >
          <MdOutlineEdit />
          Edit
        </button>
        <button
          type='button'
          className={css.btn}
          onClick={handleDeleteClick}
        >
          <RiDeleteBin5Fill />
          Delete
        </button>
      </div>
    </>
  );
};

export default Contact;
