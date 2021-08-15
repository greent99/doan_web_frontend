import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions';
import EditCourseForm from './components/EditCourseForm';
import './editCoursePage.scss';

const EditCoursePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Course', 'Edit Course']));
  }, [dispatch]);

  return (
    <div id="user-form-page">
      <div className="container">
        <h4 className="form-header">Edit Course</h4>
        <EditCourseForm />
      </div>
    </div>
  );
};

export default EditCoursePage;
