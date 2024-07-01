import * as Yup from 'yup';

export const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short - should be 3 chars minimum')
    .max(13, 'Name is too long - should be 13 chars minimum')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be 10 digits')
    .required('Required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .min(10, 'Email is too short - should be 10 chars minimum')
    .required('No email provided'),
  password: Yup.string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
});

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short - should be 3 chars minimum')
    .max(20, 'Name is too long - should be 20 chars minimum')
    .required('No name provided'),
  email: Yup.string()
    .email('Invalid email')
    .min(10, 'Email is too short - should be 10 chars minimum')
    .required('No email provided'),
  password: Yup.string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can contain only Latin letters'),
});
