import { GET_ASSET_REQUEST, GET_ASSET_SUCCESS, GET_ASSET_FAIL } from '../constants';

export const getAssetReducer = (
  state = {
    loading: false,
    data: { Category: { categoryName: '' } },
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ASSET_REQUEST:
      return { ...state, loading: true };
    case GET_ASSET_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case GET_ASSET_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
