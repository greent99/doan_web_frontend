import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions/headerActions';
import AddForm from './components/AddForm';
import './Add.css';

export default function Add() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Create New Asset']));
  }, [dispatch]);

  return (
    <div id="add-asset">
      <div className="container">
        <h4 className="form-header">
          <b>Create New Category</b>
        </h4>
        <AddForm />
      </div>
    </div>
  );
}
