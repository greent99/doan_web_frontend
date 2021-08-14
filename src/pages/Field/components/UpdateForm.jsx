import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { editField, getField } from '../../../actions';
import { createToast } from '../../../utils';

const EditUserForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useSelector((state) => state.getFieldReducer);
  const { editingLoading, editingError } = useSelector((state) => state.editFieldReducer);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field')
      .max(255)
      .test('name', 'Invalid name', (value) => {
        if (value) {
          const str = value.replace(/\s\s+/g, ' ');
          return str === value;
        }
        return true;
      }),
    category: Yup.number().required('Category is a required field'),
  });
  useEffect(() => {
    dispatch(getField(id));
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
        history.push('/fields');
      }
    }
  }, [isSubmitted, editingLoading, editingError]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories').then((response) => {
      if (response.status === 200) setListCategory(response.data.dataRows);
    });
  }, []);
  const onSubmit = (values) => {
    dispatch(editField(id, values.name, values.category));
    setIsSubmitted(true);
  };
  const cancel = () => {
    history.push('/fields');
  };
  const renderListCategory = (categories) =>
    categories.map((category) => <option value={category.id}>{category.name}</option>);
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
                <FormLabel htmlFor="name" column sm="3">
                  Name<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field id="name" name="name" placeholder="" className="form-control" />
                  <ErrorMessage name="name" component="span" className="error-message" />
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

              <Form.Group as={Row} className="mb-3">
                <Form.Label htmlFor="category" column sm="3">
                  Category<sup className="required-icon">*</sup>
                </Form.Label>
                <Col sm="9">
                  <Field component="select" id="category" name="category" className="custom-select">
                    {renderListCategory(listCategory)}
                  </Field>
                  <ErrorMessage name="category" component="span" className="error-message" />
                </Col>
              </Form.Group>

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
