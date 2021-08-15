import {
  GET_ALL_COURSE_REQUEST,
  GET_ALL_COURSE_SUCCESS,
  GET_ALL_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  EDIT_COURSE_REQUEST,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
} from '../constants';

export const getAllCourseReducer = (
  state = {
    loading: false,
    courses: [],
    error: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_COURSE_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload.dataRows,
        error: null,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case GET_ALL_COURSE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCourseReducer = (
  state = {
    addSuccess: false,
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { ...state, addSuccess: false, error: null, loading: true };
    case CREATE_COURSE_SUCCESS:
      return { ...state, addSuccess: true, error: null, loading: false };
    case CREATE_COURSE_FAIL:
      return { ...state, addSuccess: false, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const editCourseReducer = (
  state = {
    editingLoading: false,
    category: null,
    editingError: null,
  },
  action
) => {
  switch (action.type) {
    case EDIT_COURSE_REQUEST:
      return { ...state, editingLoading: true };
    case EDIT_COURSE_SUCCESS:
      return { ...state, editingLoading: false, category: action.payload, editingError: null };
    case EDIT_COURSE_FAIL:
      return { ...state, editingLoading: false, editingError: action.payload };
    default:
      return state;
  }
};

export const getCourseReducer = (
  state = {
    loading: false,
    data: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_COURSE_REQUEST:
      return { ...state, loading: true };
    case GET_COURSE_SUCCESS:
      return { ...state, loading: false, data: action.payload.COURSE, error: null };
    case GET_COURSE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCourseReducer = (
  state = {
    deleteLoading: false,
    deleteError: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
      return { ...state, deleteLoading: true, success: false };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
        success: true,
      };
    case DELETE_COURSE_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload, success: false };
    default:
      return state;
  }
};
