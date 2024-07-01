import { useDispatch, useSelector } from 'react-redux';
import { IoPerson } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import { openDeleteModal, openEditModal } from '../../redux/modal/slice';
import { selectContactById } from '../../redux/contacts/selectors';
import clsx from 'clsx';
import css from './Contact.module.css';

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  const activeContact = useSelector(state => selectContactById(state, id));

  const handleEditClick = () => {
    dispatch(openEditModal(activeContact));
  };

  const handleDeleteClick = () => {
    dispatch(openDeleteModal(activeContact));
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
}
