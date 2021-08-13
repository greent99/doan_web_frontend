import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions/headerActions';
import UpdateForm from './components/UpdateForm';
import './Add.css';

export default function Update() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Update Asset']));
  }, [dispatch]);

  return (
    <div id="add-asset">
      <div className="container">
        <h4 className="form-header">
          <b>Update Asset</b>
        </h4>
        <UpdateForm />
      </div>
    </div>
  );
}
