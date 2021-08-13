import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL } from '../constants';

export const getAllUsersReducer = (
  state = {
    loading: false,
    users: [],
    error: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.dataRows,
        error: null,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case GET_ALL_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
