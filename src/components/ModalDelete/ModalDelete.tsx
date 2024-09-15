import React from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import clsx from 'clsx';

import { closeDeleteModal } from '../../redux/modal/slice';
import {
  selectDeleteModalIsOpen,
  selectActiveContact,
} from '../../redux/modal/selectors';
import { deleteContact } from '../../redux/contacts/operations';
import { useAppDispatch, useAppSelector } from '../../ts/hooks';
import css from './ModalDelete.module.css';

Modal.setAppElement('#root');

const ModalDelete: React.FC = () => {
  const dispatch = useAppDispatch();

  const contactToDelete = useAppSelector(selectActiveContact);
  const isOpen = useAppSelector(selectDeleteModalIsOpen);

  if (!isOpen || !contactToDelete) {
    return null;
  }

  const handleDelete = () => {
    dispatch(deleteContact(contactToDelete.id))
      .unwrap()
      .then(() => {
        toast.success('Contact successfully deleted!');
        dispatch(closeDeleteModal());
      })
      .catch(() => {
        toast.error('Something went wrong. Try again!');
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeDeleteModal())}
      className={css.modalDelete}
      overlayClassName={css.overlayDelete}
      contentLabel='Delete Modal'
      closeTimeoutMS={400}
    >
      <h2 className={css.title}>Confirm deletion</h2>
      <p className={css.text}>Are you sure you want do delete the contact?</p>
      <div className={css.delBtnWrapper}>
        <button
          type='button'
          className={css.delBtn}
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          type='button'
          className={clsx(css.delBtn, css.btnNo)}
          onClick={() => dispatch(closeDeleteModal())}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
