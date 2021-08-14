import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions';
import EditUserForm from './components/EditUserForm';
import './editCoursePage.scss';

const EditUserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Course', 'Edit Course']));
  }, [dispatch]);

  return (
    <div id="user-form-page">
      <div className="container">
        <h4 className="form-header">Edit Course</h4>
        <EditUserForm />
      </div>
    </div>
  );
};

export default EditUserPage;
