import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

import { register } from '../../redux/auth/operations';
import { RegistrationSchema } from '../../ts/validation';
import { useAppDispatch } from '../../ts/hooks';
import { NewUser } from '../../ts/types';
import css from './RegistrationForm.module.css';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: NewUser, actions: FormikHelpers<NewUser>) => {
    dispatch(register(values))
      .unwrap()
      .catch(() => {
        toast.error('Registration error!');
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form
        className={css.form}
        autoComplete='off'
      >
        <label className={css.label}>
          Username
          <Field
            className={css.input}
            type='text'
            name='name'
          />
        </label>
        <ErrorMessage
          className={css.error}
          name='name'
          component='span'
        />
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
          Sign up
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
