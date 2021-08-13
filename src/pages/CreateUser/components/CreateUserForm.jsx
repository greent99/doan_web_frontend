import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { createUser } from '../../../actions';
import { createToast } from '../../../utils';

const CreateUserForm = () => {
  const initialValues = {
    email: '',
    password: '',
    username: '',
    phone: '',
    gender: 'Female',
    userType: 'Staff',
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.createUserReducer);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is a required field')
      .max(255)
      .test('email', 'Email do not include spaces!', (value) => {
        if (value) {
          return !value.includes(' ');
        }
        return true;
      }),
    password: Yup.string()
      .required('Password is a required field')
      .max(255)
      .test('password', 'Password do not include spaces!', (value) => {
        if (value) {
          return !value.includes(' ');
        }
        return true;
      }),
    changepassword: Yup.string()
      .required('Change password is a required field')
      .when('password', {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
      }),
    username: Yup.string()
      .required('User name is a required field')
      .max(255)
      .test('username', 'Username do not include spaces!', (value) => {
        if (value) {
          return !value.includes(' ');
        }
        return true;
      }),
    fullname: Yup.string()
      .required('Full name is a required field')
      .max(255)
      .test('fullname', 'Invalid name', (value) => {
        if (value) {
          const str = value.replace(/\s\s+/g, ' ');
          return str === value;
        }
        return true;
      }),
    gender: Yup.string().required('Gender is a required field').max(10),
    userType: Yup.string().required('User type is a required field').max(20),
  });
  useEffect(() => {
    if (isSubmitted) {
      if (!loading && error) {
        createToast(error, 'error');
      }
      if (!loading && !error) {
        setIsSubmitted(false);
        history.push('/users');
      }
    }
  }, [isSubmitted, loading, error]);
  const onSubmit = (values) => {
    dispatch(createUser({ ...values }));
    setIsSubmitted(true);
  };
  const cancel = () => {
    history.push('/users');
  };
  return (
    <>
      <ToastContainer />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="email" column sm="3">
                Email<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field id="email" name="email" placeholder="" className="form-control" />
                <ErrorMessage name="email" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="password" column sm="3">
                Password<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder=""
                  className="form-control"
                />
                <ErrorMessage name="password" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="changepassword" column sm="3">
                Confirm Password<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field
                  id="changepassword"
                  name="changepassword"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage name="changepassword" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="username" column sm="3">
                Username<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field id="username" name="username" placeholder="" className="form-control" />
                <ErrorMessage name="username" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="fullname" column sm="3">
                Full Name<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field id="fullname" name="fullname" placeholder="" className="form-control" />
                <ErrorMessage name="fullname" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="gender" column sm="3" className="mt-1">
                Gender<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Row className="mt-2">
                  <div className="form-check">
                    <Field type="radio" id="female-gender" name="gender" value="Female" />
                    <FormLabel htmlFor="female-gender" className="ml-3 mt-1">
                      Female
                    </FormLabel>
                  </div>

                  <div className="form-check">
                    <Field type="radio" id="male-gender" name="gender" value="Male" />
                    <FormLabel htmlFor="male-gender" className="ml-3 mt-1">
                      Male
                    </FormLabel>
                  </div>
                </Row>

                <ErrorMessage name="gender" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="userType" column sm="3">
                Type<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field component="select" id="userType" name="userType" className="custom-select">
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </Field>
                <ErrorMessage name="userType" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button
                disabled={!((dirty && isValid) || isSubmitting)}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
              <button type="button" onClick={cancel} className="btn btn-light ml-4">
                Cancel
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateUserForm;
