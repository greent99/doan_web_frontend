import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, FormGroup, FormLabel } from 'react-bootstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { createField } from '../../../actions';
import { createToast } from '../../../utils';
import './AddForm.css';

const AddForm = () => {
  const initValue = {
    name: '',
    category: 1,
  };

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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, addSuccess } = useSelector((state) => state.createFieldReducer);
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    if (isSubmitted && !loading) {
      if (error) createToast(error, 'error');
      else {
        setIsSubmitted(false);
        history.push('/fields');
      }
    }
  }, [isSubmitted, loading, error]);

  const onSubmit = (values) => {
    dispatch(createField({ ...values }));
    setIsSubmitted(true);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories').then((response) => {
      if (response.status === 200) setListCategory(response.data.dataRows);
    });
  }, [addSuccess]);

  const renderListCategory = (categories) =>
    categories.map((category) => <option value={category.id}>{category.name}</option>);

  return (
    <div id="asset-form-container">
      <ToastContainer />
      <Formik initialValues={initValue} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, handleSubmit, dirty, isValid }) => (
          <Form onSubmit={handleSubmit} className="formContainer" autoComplete="off">
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Name<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Field id="name" name="name" placeholder="" className="form-control" />
                <ErrorMessage name="name" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="category" column sm="3">
                Type<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <Field component="select" id="category" name="category" className="custom-select">
                  {renderListCategory(listCategory)}
                </Field>
                <ErrorMessage name="userType" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <Form.Group className="text-right">
              <Button
                disabled={!((dirty && isValid) || isSubmitting)}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </Button>
              <Button
                id="cancel-button"
                className="btn btn-light"
                onClick={() => {
                  history.push('/assets');
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddForm;
