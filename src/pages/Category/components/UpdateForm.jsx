import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { getUser, editUser } from '../../../actions';
import { createToast } from '../../../utils';

const EditUserForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useSelector((state) => state.getUserReducer);
  const { editingLoading, editingError } = useSelector((state) => state.editUserReducer);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is a required field')
      .max(255)
      .test('fullname', 'Invalid name', (value) => {
        if (value) {
          const str = value.replace(/\s\s+/g, ' ');
          return str === value;
        }
        return true;
      }),
  });
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  useEffect(() => {
    if (!loading && error) {
      history.push('/categories');
    }
  }, [loading, error]);
  useEffect(() => {
    if (isSubmitted) {
      if (!editingLoading && editingError) {
        createToast(editingError, 'error');
        setIsSubmitted(false);
      }
      if (!loading && !error) {
        history.push('/categories');
      }
    }
  }, [isSubmitted, editingLoading, editingError]);
  const onSubmit = (values) => {
    dispatch(editUser(id, values.name));
    setIsSubmitted(true);
  };
  const cancel = () => {
    history.push('/categories');
  };
  if (!loading && data) {
    return (
      <>
        <ToastContainer />
        <Formik
          initialValues={{
            name: data.name,
            id: data.id,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="formContainer" autoComplete="off">
              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="id" column sm="3">
                  Id<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field disabled id="id" name="id" placeholder="" className="form-control" />
                  <ErrorMessage name="id" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="name" column sm="3">
                  Name<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field id="username" name="name" placeholder="" className="form-control" />
                  <ErrorMessage name="name" component="span" className="error-message" />
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
  }
  return <></>;
};

export default EditUserForm;
