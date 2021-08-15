import axios from 'axios';
import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  EDIT_COURSE_REQUEST,
  EDIT_COURSE_SUCCESS,
  STORE_COURSE,
  EDIT_COURSE_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  GET_ALL_COURSE_REQUEST,
  GET_ALL_COURSE_SUCCESS,
  GET_ALL_COURSE_FAIL,
  REMOVE_STORE_COURSE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

export const createCourse =
  ({ name, author, field, price, description, status, file }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_COURSE_REQUEST,
    });
    try {
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('author', author);
      formData.append('fieldid', field);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('status', status);
      const res = await axios.post(`http://localhost:5000/api/courses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_COURSE_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };
export const editCourse = (id, name, category) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_COURSE_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.put(
      `http://localhost:5000/api/courses/${id}`,
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
      type: EDIT_COURSE_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: STORE_COURSE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COURSE_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const getCourse = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_COURSE_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COURSE_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const getAllCourse = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_COURSE_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    // const paramsTxt = queryString.stringify(body);
    const res = await axios.get('http://localhost:5000/api/courses', {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_ALL_COURSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_COURSE_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const removeStoreCourse = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_COURSE,
  });
};

export const deleteCourse = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_COURSE_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.delete(`http://localhost:5000/api/courses/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};
