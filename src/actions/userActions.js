import axios from 'axios';
import queryString from 'querystring';
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  USERS_CHANGE_PASSWORD_FAIL,
  USERS_CHANGE_PASSWORD_REQUEST,
  USERS_CHANGE_PASSWORD_SUCCESS,
  USERS_GET_CURRENT_USER_DATA,
  USERS_LOGIN_FAIL,
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  USERS_LOGOUT,
  STORE_USER,
  REMOVE_STORE_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

const USERS_URL = `${process.env.REACT_APP_API_URL}/users`;

export const getAllUsers = (body) => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_USERS_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const paramsTxt = queryString.stringify(body);
    const res = await axios.get(`http://localhost:5000/api/user?${paramsTxt}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({
      type: USERS_LOGIN_REQUEST,
    });
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      dispatch({
        type: USERS_LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem('userData', JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: USERS_LOGIN_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const createUser =
  ({ email, username, password, gender, userType, fullname }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user',
        {
          email,
          username,
          password,
          gender,
          userType,
          fullname,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const getCurrentUserData = () => (dispatch) => {
  dispatch({
    type: USERS_GET_CURRENT_USER_DATA,
  });
};

export const changePassword =
  ({ password, oldPassword, newPassword }) =>
  async (dispatch, getState) => {
    dispatch({
      type: USERS_CHANGE_PASSWORD_REQUEST,
    });
    const { authReducer } = getState();
    const { userData } = authReducer;
    try {
      let dataBody;

      if (userData.firstTimeLogin) {
        dataBody = { password };
      } else {
        dataBody = { oldPassword, newPassword };
      }

      const res = await axios.patch(
        `${USERS_URL}/change-password`,
        {
          ...dataBody,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...userData,
          firstTimeLogin: false,
          user: {
            ...userData.user,
            firstTimeLogin: false,
          },
        })
      );
      dispatch({
        type: USERS_CHANGE_PASSWORD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USERS_CHANGE_PASSWORD_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: USERS_LOGOUT,
  });

  localStorage.removeItem('userData');
};

export const removeStoreUser = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_USER,
  });
};

export const getUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(`http://localhost:5000/api/user/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const editUser =
  (id, email, username, fullname, gender, userType) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_USER_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/user/${id}`,
        {
          email,
          username,
          fullname,
          gender,
          userType,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_USER_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_USER_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.delete(`http://localhost:5000/api/user/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};
