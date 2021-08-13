import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL } from '../constants';

export const deleteUserReducer = (
  state = {
    deleteLoading: false,
    deleteError: null,
    deleteSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { ...state, deleteLoading: true, deleteSuccess: false };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        user: action.payload,
        deleteError: null,
        deleteSuccess: true,
      };
    case DELETE_USER_FAIL:
      return { ...state, deleteLoading: false, deleteError: action.payload, deleteSuccess: false };
    default:
      return state;
  }
};
