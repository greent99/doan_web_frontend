import axios from 'axios';
import {
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_SUCCESS,
  CREATE_FIELD_FAIL,
  EDIT_FIELD_REQUEST,
  EDIT_FIELD_SUCCESS,
  STORE_FIELD,
  EDIT_FIELD_FAIL,
  GET_FIELD_REQUEST,
  GET_FIELD_SUCCESS,
  GET_FIELD_FAIL,
  GET_ALL_FIELD_REQUEST,
  GET_ALL_FIELD_SUCCESS,
  GET_ALL_FIELD_FAIL,
  REMOVE_STORE_FIELD,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAIL,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

export const createField =
  ({ name, category }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_FIELD_REQUEST,
    });
    try {
      const res = await axios.post(`http://localhost:5000/api/fields`, {
        name,
        categoryid: category,
      });
      dispatch({
        type: CREATE_FIELD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_FIELD_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };
export const editField = (id, name, category) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_FIELD_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.put(
      `http://localhost:5000/api/fields/${id}`,
      {
        name,
        categoryid: category,
      },
      {
        headers: {
          Authorization: createAuthorizedRequestHeader(userData),
        },
      }
    );
    dispatch({
      type: EDIT_FIELD_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: STORE_FIELD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_FIELD_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const getField = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_FIELD_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(`http://localhost:5000/api/fields/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_FIELD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FIELD_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const getAllField = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_FIELD_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    // const paramsTxt = queryString.stringify(body);
    const res = await axios.get('http://localhost:5000/api/fields', {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_ALL_FIELD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FIELD_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const removeStoreField = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_FIELD,
  });
};

export const deleteField = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_FIELD_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.delete(`http://localhost:5000/api/categories/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: DELETE_FIELD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FIELD_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};
