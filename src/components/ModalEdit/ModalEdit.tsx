import React from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import clsx from 'clsx';

import { IoPerson } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';

import { closeEditModal } from '../../redux/modal/slice';
import {
  selectActiveContact,
  selectEditModalIsOpen,
} from '../../redux/modal/selectors';
import { editContact } from '../../redux/contacts/operations';

import { ContactSchema } from '../../ts/validation';
import { useAppDispatch, useAppSelector } from '../../ts/hooks';
import css from './ModalEdit.module.css';
import { EditFormValues } from '../../ts/types';

Modal.setAppElement('#root');

const ModalEdit: React.FC = () => {
  const dispatch = useAppDispatch();

  const contactToEdit = useAppSelector(selectActiveContact);
  const isOpen = useAppSelector(selectEditModalIsOpen);

  if (!isOpen || !contactToEdit) {
    return null;
  }

  const handleEdit = (
    values: EditFormValues,
    actions: FormikHelpers<EditFormValues>
  ) => {
    dispatch(
      editContact({
        id: contactToEdit.id,
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Contact successfully updated!');
        dispatch(closeEditModal());
      })
      .catch(() => {
        toast.error('Something went wrong. Try again!');
      });
    actions.resetForm();
  };

  if (!contactToEdit) return null;

  const initialValues: EditFormValues = {
    id: contactToEdit.id,
    name: contactToEdit.name || '',
    number: contactToEdit.number || '',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeEditModal())}
      className={css.modalEdit}
      overlayClassName={css.overlayEdit}
      contentLabel='Edit Modal'
      closeTimeoutMS={400}
    >
      <h2 className={css.delText}>Input changes:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleEdit}
      >
        <Form className={css.contactBox}>
          <label className={css.label}>
            <IoPerson size={30} />
            <Field
              className={css.input}
              name='name'
              type='text'
            ></Field>
          </label>
          <ErrorMessage
            className={css.error}
            name='name'
            component='span'
          />
          <label className={css.label}>
            <FaPhone size={30} />
            <Field
              className={css.input}
              name='number'
              type='number'
            ></Field>
          </label>
          <ErrorMessage
            className={css.error}
            name='number'
            component='span'
          />
          <div className={css.btnWrapper}>
            <button
              type='submit'
              className={clsx(css.editBtn, css.btn)}
            >
              Save
            </button>
            <button
              onClick={() => dispatch(closeEditModal())}
              className={css.btn}
              type='button'
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ModalEdit;
