import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

import { logIn } from '../../redux/auth/operations';
import { LoginSchema } from '../../ts/validation';
import { useAppDispatch } from '../../ts/hooks';
import { UserData } from '../../ts/types';

import css from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: UserData, actions: FormikHelpers<UserData>) => {
    dispatch(logIn(values))
      .unwrap()
      .catch(() => {
        toast.error('Authorization error! Please try again.');
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form
        className={css.form}
        autoComplete='off'
      >
        <label className={css.label}>
          Email
          <Field
            className={css.input}
            type='email'
            name='email'
          ></Field>
        </label>
        <ErrorMessage
          className={css.error}
          name='email'
          component='span'
        />
        <label className={css.label}>
          Password
          <Field
            className={css.input}
            type='password'
            name='password'
          ></Field>
        </label>
        <ErrorMessage
          className={css.error}
          name='password'
          component='span'
        />
        <button
          className={css.btn}
          type='submit'
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
