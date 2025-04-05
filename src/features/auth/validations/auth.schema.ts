import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    name: yup.string().required('Name is required'),
  }),
});

export const loginSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
}); 