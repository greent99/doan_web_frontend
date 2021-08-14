import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions';
import CreateCourseForm from './components/CreateCourseForm';
import './createCoursePage.scss';

const CreateUserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Course', 'Create New Category']));
  }, [dispatch]);

  return (
    <div id="user-form-page">
      <div className="container">
        <h4 className="form-header">Create New Course</h4>
        <CreateCourseForm />
      </div>
    </div>
  );
};

export default CreateUserPage;
