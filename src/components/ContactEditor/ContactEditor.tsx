import React from 'react';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

import css from './ContactEditor.module.css';

import { addContact } from '../../redux/contacts/operations';
import { ContactSchema } from '../../ts/validation';
import { useAppDispatch } from '../../ts/hooks';
import { ContactFormValues } from '../../ts/types';

const ContactForm: React.FC = () => {
  const initialValues = { name: '', number: '' };
  const fieldId = useId();
  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: ContactFormValues,
    actions: FormikHelpers<ContactFormValues>
  ) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success('Contact successfully added to your phonebook!');
      })
      .catch(() => {
        toast.error('Something went wrong. Try again!');
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-name`}>Name</label>
          <Field
            className={css.input}
            name='name'
            id={`${fieldId}-name`}
            type='text'
          />
          <ErrorMessage
            className={css.error}
            name='name'
            component='span'
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-number`}>Number</label>
          <Field
            className={css.input}
            name='number'
            id={`${fieldId}-number`}
            type='tel'
          />
          <ErrorMessage
            className={css.error}
            name='number'
            component='span'
          />
        </div>

        <button
          type='submit'
          className={css.btn}
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
