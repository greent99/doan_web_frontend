import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../actions/userActions';
import { createToast } from '../../../utils';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.authReducer);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      if (!loading && error) {
        setIsSubmitted(false);
        createToast(error, 'error');
        return;
      }
      if (!loading && !error) {
        setIsSubmitted(false);
        createToast('Welcome back', 'success');
        history.push('/');
      }
    }
  }, [isSubmitted, loading, error]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is a required field').max(255),
    password: Yup.string().required('Password is a required field').max(1024),
  });

  const onSubmit = (values) => {
    dispatch(login({ ...values }));
    setIsSubmitted(true);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup>
              <FormLabel htmlFor="email">Username: </FormLabel>
              <ErrorMessage name="email" component="span" className="error-message" />
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Password: </FormLabel>
              <ErrorMessage name="password" component="span" className="error-message" />
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!((dirty && isValid) || isSubmitting)}
              >
                Login
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
