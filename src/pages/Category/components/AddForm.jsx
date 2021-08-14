import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createCategory } from '../../../actions';
import { createToast } from '../../../utils';
import './AddForm.css';
import { AddAndUpdateSchema } from '../../../schemas';

const AddForm = () => {
  const initValue = {
    name: '',
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, errorAddCategory } = useSelector((state) => state.createCategoryReducer);

  useEffect(() => {
    if (isSubmitted && !loading) {
      if (errorAddCategory) createToast(errorAddCategory, 'error');
      else {
        setIsSubmitted(false);
        history.push('/categories');
      }
    }
  }, [isSubmitted, loading, errorAddCategory]);

  const onSubmit = (values) => {
    dispatch(createCategory({ ...values }));
    setIsSubmitted(true);
  };

  return (
    <div id="asset-form-container">
      <ToastContainer />
      <Formik initialValues={initValue} validationSchema={AddAndUpdateSchema} onSubmit={onSubmit}>
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
