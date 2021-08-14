import {
  GET_ALL_FIELD_REQUEST,
  GET_ALL_FIELD_SUCCESS,
  GET_ALL_FIELD_FAIL,
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_SUCCESS,
  CREATE_FIELD_FAIL,
  EDIT_FIELD_REQUEST,
  EDIT_FIELD_SUCCESS,
  EDIT_FIELD_FAIL,
  GET_FIELD_REQUEST,
  GET_FIELD_SUCCESS,
  GET_FIELD_FAIL,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAIL,
} from '../constants';

export const getAllFieldReducer = (
  state = {
    loading: false,
    fields: [],
    error: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_FIELD_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        fields: action.payload.dataRows,
        error: null,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case GET_ALL_FIELD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createFieldReducer = (
  state = {
    addSuccess: false,
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_FIELD_REQUEST:
      return { ...state, addSuccess: false, error: null, loading: true };
    case CREATE_FIELD_SUCCESS:
      return { ...state, addSuccess: true, error: null, loading: false };
    case CREATE_FIELD_FAIL:
      return { ...state, addSuccess: false, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const editFieldReducer = (
  state = {
    editingLoading: false,
    category: null,
    editingError: null,
  },
  action
) => {
  switch (action.type) {
    case EDIT_FIELD_REQUEST:
      return { ...state, editingLoading: true };
    case EDIT_FIELD_SUCCESS:
      return { ...state, editingLoading: false, category: action.payload, editingError: null };
    case EDIT_FIELD_FAIL:
      return { ...state, editingLoading: false, editingError: action.payload };
    default:
      return state;
  }
};

export const getFieldReducer = (
  state = {
    loading: false,
    data: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_FIELD_REQUEST:
      return { ...state, loading: true };
    case GET_FIELD_SUCCESS:
      return { ...state, loading: false, data: action.payload.field, error: null };
    case GET_FIELD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFieldReducer = (
  state = {
    deleteLoading: false,
    deleteError: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_FIELD_REQUEST:
      return { ...state, deleteLoading: true, success: false };
    case DELETE_FIELD_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        success: true,
      };
    case DELETE_FIELD_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload, success: false };
    default:
      return state;
  }
};
