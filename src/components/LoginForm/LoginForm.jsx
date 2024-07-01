import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { logIn } from '../../redux/auth/operations';
import { LoginSchema } from '../../js/validation';
import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
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
}
