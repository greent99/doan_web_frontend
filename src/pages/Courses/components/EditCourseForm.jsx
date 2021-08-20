import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { editCourse, getCourse } from '../../../actions';
import { createToast } from '../../../utils';

const EditCourseForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useSelector((state) => state.getCourseReducer);
  const { editingLoading, editingError } = useSelector((state) => state.editCourseReducer);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listAuthor, setListAuthor] = useState([]);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field')
      .max(255)
      .test('name', 'Name do not include spaces!', (value) => {
        if (value) {
          return !value.includes(' ');
        }
        return true;
      }),
    author: Yup.number().required('Author is a required field'),
    description: Yup.string(),
    status: Yup.string().required('Status is a required field').max(255),
    price: Yup.number().required('Price is a required field').min(0),
  });
  const initialValues = {
    name: '',
    author: 22,
    description: '',
    status: '',
    price: 0,
    field: 1,
  };
  useEffect(() => {
    dispatch(getCourse(id));
  }, []);
  useEffect(() => {
    if (!loading && error) {
      history.push('/users');
    }
  }, [loading, error]);
  useEffect(() => {
    if (isSubmitted) {
      if (!editingLoading && editingError) {
        createToast(editingError, 'error');
        setIsSubmitted(false);
      }
      if (!loading && !error) {
        history.push('/users');
      }
    }
  }, [isSubmitted, editingLoading, editingError]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/fields').then((response) => {
      if (response.status === 200) setListCategory(response.data.dataRows);
    });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:5000/api/user/getByRole/Teacher').then((response) => {
      if (response.status === 200) setListAuthor(response.data.users);
    });
  }, []);
  const onSubmit = (values) => {
    dispatch(
      editCourse(id, values.email, values.username, values.fullname, values.gender, values.userType)
    );
    setIsSubmitted(true);
  };
  const cancel = () => {
    history.push('/courses');
  };
  const renderListCategory = (categories) =>
    categories.map((category) => <option value={category.id}>{category.name}</option>);
  const renderListAuthor = (authors) =>
    authors.map((author) => <option value={author.id}>{author.fullname}</option>);
  if (!loading && data) {
    return (
      <>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
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
                  <Field disabled id="name" name="name" placeholder="" className="form-control" />
                  <ErrorMessage name="name" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="author" column sm="3">
                  Author<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field
                    disabled
                    component="select"
                    id="author"
                    name="author"
                    className="custom-select"
                  >
                    {renderListAuthor(listAuthor)}
                  </Field>
                  <ErrorMessage name="author" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="field" column sm="3">
                  Category<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field
                    disabled
                    component="select"
                    id="field"
                    name="field"
                    className="custom-select"
                  >
                    {renderListCategory(listCategory)}
                  </Field>
                  <ErrorMessage name="category" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="price" column sm="3">
                  Price<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field disabled id="price" name="price" placeholder="" className="form-control" />
                  <ErrorMessage name="price" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="description" column sm="3">
                  Description<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field
                    disabled
                    id="description"
                    name="description"
                    placeholder=""
                    className="form-control"
                  />
                  <ErrorMessage name="description" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="description" column sm="3">
                  Avatar<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <input disabled id="file" name="file" type="file" />
                  <ErrorMessage name="file" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="status" column sm="3" className="mt-1">
                  Status<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Row className="mt-2">
                    <div className="form-check">
                      <Field type="radio" id="female-gender" name="status" value="Available" />
                      <FormLabel htmlFor="female-gender" className="ml-3 mt-1">
                        Available
                      </FormLabel>
                    </div>

                    <div className="form-check">
                      <Field type="radio" id="male-gender" name="status" value="Not Available" />
                      <FormLabel htmlFor="male-gender" className="ml-3 mt-1">
                        Not Available
                      </FormLabel>
                    </div>
                  </Row>

                  <ErrorMessage name="status" component="span" className="error-message" />
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

export default EditCourseForm;
