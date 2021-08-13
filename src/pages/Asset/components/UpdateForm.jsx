/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Form, Col, Row, Button, FormLabel, Dropdown } from 'react-bootstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { updateAsset, getAsset } from '../../../actions';
import './UpdateForm.css';
import { createToast } from '../../../utils';
import { AddAndUpdateSchema } from '../../../schemas';

const UpdateForm = () => {
  const CATEGORY_URL = `${process.env.REACT_APP_API_URL}/categories`;

  const { editLoading, editError } = useSelector((state) => state.updateAssetReducer);

  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listCategory, setListCat] = useState([]);
  const [indexCategory, setIndexCategory] = useState('Laptop');
  const { loading, error, data } = useSelector((state) => state.getAssetReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAsset(id));
  }, []);

  useEffect(() => {
    setIndexCategory(data.Category.categoryName);
  }, [data]);

  useEffect(() => {
    if (isSubmitted) {
      if (!editLoading && editError) {
        createToast(editError, 'error');
        setIsSubmitted(false);
      }
      if (!loading && !error) {
        history.push('/assets');
      }
    }
  }, [isSubmitted, editLoading, editError]);

  useEffect(async () => {
    await axios.get(CATEGORY_URL).then((response) => {
      if (response.status === 200) setListCat(response.data);
    });
  }, []);

  const onSubmit = (values) => {
    dispatch(
      updateAsset(
        id,
        values.name,
        values.category,
        values.specification,
        values.installedDate,
        values.state
      )
    );
    setIsSubmitted(true);
  };

  const handleClick = (e) => {
    setIndexCategory(e.currentTarget.textContent);
  };

  const cancel = () => {
    history.push('/assets');
  };

  const renderListCategory = (list) =>
    list.map((item) => (
      <Dropdown.Item onClick={handleClick} eventKey={item.id}>
        {item.categoryName}
      </Dropdown.Item>
    ));

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          name: data.assetName,
          category: data.categoryId,
          specification: data.assetSpec,
          installedDate: data.installedDateStr,
          state: data.state,
        }}
        validationSchema={AddAndUpdateSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, handleSubmit, dirty, isValid, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className="formContainer" autoComplete="off">
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Name<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Field id="name" name="name" className="form-control" />
                <ErrorMessage name="name" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Category<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Dropdown
                  className="dropdown-update"
                  disabled
                  onSelect={(e) => {
                    setFieldValue('category', e);
                  }}
                >
                  <Dropdown.Toggle
                    disabled
                    variant="secondary"
                    className="d-flex align-items-start justify-content-between"
                    id="dropdown-togle-update"
                  >
                    {indexCategory}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                    {renderListCategory(listCategory)}
                  </Dropdown.Menu>
                </Dropdown>
                <ErrorMessage name="category" component="span" className="error-message" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Specification<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Field as="textarea" name="specification" placeholder="" className="text-area" />
                <ErrorMessage name="specification" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Installed Date<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Field
                  type="date"
                  id="installedDate"
                  name="installedDate"
                  className="form-control"
                />
                <ErrorMessage name="installedDate" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                State<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Row>
                  <Col>
                    <Field type="radio" id="available-state" name="state" value="Available" />
                    <FormLabel className="radio-button" htmlFor="available-state">
                      Available
                    </FormLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="radio"
                      id="not-available-state"
                      name="state"
                      value="Not Available"
                    />
                    <FormLabel className="radio-button" htmlFor="not-available-state">
                      Not Available
                    </FormLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="radio"
                      id="waiting-for-recycling-state"
                      name="state"
                      value="Waiting for recycling"
                    />
                    <FormLabel className="radio-button" htmlFor="waiting-for-recycling-state">
                      Waiting for recycling
                    </FormLabel>
                  </Col>
                </Row>
                <Field type="radio" id="recycled-state" name="state" value="Recycled" />
                <FormLabel className="radio-button" htmlFor="recycled-state">
                  Recycled
                </FormLabel>
                <ErrorMessage name="state" component="span" className="error-message" />
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
                onClick={cancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateForm;
