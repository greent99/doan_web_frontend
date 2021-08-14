import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from '../constants';

export const getAllCategoriesReducer = (
  state = {
    loading: false,
    categories: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload, error: null };
    case GET_ALL_CATEGORIES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCategoryReducer = (
  state = {
    loading: false,
    data: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_CATEGORY_SUCCESS:
      return { ...state, loading: false, data: action.payload.category, error: null };
    case GET_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
