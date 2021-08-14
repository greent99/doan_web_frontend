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
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

const CATEGORY_URL = `${process.env.REACT_APP_API_URL}/categories`;

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

export const getAllCategories = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_CATEGORIES_REQUEST,
  });
  try {
    const res = await axios.get(CATEGORY_URL);
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
