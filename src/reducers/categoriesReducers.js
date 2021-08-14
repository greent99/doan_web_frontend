import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from '../constants';

export const getAllCategoriesReducer = (
  state = {
    loading: false,
    categories: [],
    error: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.dataRows,
        error: null,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
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

export const editCategoryReducer = (
  state = {
    editingLoading: false,
    category: null,
    editingError: null,
  },
  action
) => {
  switch (action.type) {
    case EDIT_CATEGORY_REQUEST:
      return { ...state, editingLoading: true };
    case EDIT_CATEGORY_SUCCESS:
      return { ...state, editingLoading: false, category: action.payload, editingError: null };
    case EDIT_CATEGORY_FAIL:
      return { ...state, editingLoading: false, editingError: action.payload };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (
  state = {
    deleteLoading: false,
    deleteError: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { ...state, deleteLoading: true, success: false };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        success: true,
      };
    case DELETE_CATEGORY_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload, success: false };
    default:
      return state;
  }
};
