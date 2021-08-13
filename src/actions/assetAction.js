import axios from 'axios';
import {
  CREATE_ASSET_REQUEST,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  UPDATE_ASSET_REQUEST,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSET_FAIL,
  FIND_ASSETS_REQUEST,
  FIND_ASSETS_SUCCESS,
  FIND_ASSETS_FAIL,
  REMOVE_STORE_ASSET,
  STORE_ASSET,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

const ASSET_URL = `${process.env.REACT_APP_API_URL}/assets`;

export const findAssets = (findAssetURL) => async (dispatch, getState) => {
  dispatch({
    type: FIND_ASSETS_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(findAssetURL, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: FIND_ASSETS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FIND_ASSETS_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const createAsset =
  ({ name, category, specification, installedDate, state }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CREATE_ASSET_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();
    try {
      const res = await axios.post(
        `${ASSET_URL}`,
        {
          name,
          category,
          specification,
          installedDate,
          state,
          location: 'HCM',
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: CREATE_ASSET_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_ASSET,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ASSET_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const updateAsset =
  (id, name, category, specification, installedDate, state) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_ASSET_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();
    try {
      const res = await axios.put(
        `${ASSET_URL}/${id}`,
        {
          name,
          category,
          specification,
          installedDate,
          location: 'HCM',
          state,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: UPDATE_ASSET_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_ASSET,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ASSET_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const getAsset = (id) => async (dispatch) => {
  dispatch({
    type: GET_ASSET_REQUEST,
  });
  try {
    const res = await axios.get(`${ASSET_URL}/${id}`);
    dispatch({
      type: GET_ASSET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ASSET_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const removeStoreAsset = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_ASSET,
  });
};
