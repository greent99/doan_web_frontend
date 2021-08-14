import axios from 'axios';
import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  STORE_CATEGORY,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  REMOVE_STORE_CATEGORY,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

export const createCategory =
  ({ name }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });
    try {
      const res = await axios.post(`http://localhost:5000/api/categories`, {
        name,
      });
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const getAllCategories = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_CATEGORIES_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    // const paramsTxt = queryString.stringify(body);
    const res = await axios.get('http://localhost:5000/api/categories', {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const editCategory = (id, name) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_CATEGORY_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.put(
      `http://localhost:5000/api/categories/${id}`,
      {
        name,
      },
      {
        headers: {
          Authorization: createAuthorizedRequestHeader(userData),
        },
      }
    );
    dispatch({
      type: EDIT_CATEGORY_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: STORE_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CATEGORY_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const getCategory = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGORY_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(`http://localhost:5000/api/categories/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const removeStoreCategory = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_CATEGORY,
  });
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_CATEGORY_REQUEST,
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
      type: DELETE_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};
