import jwpaginate from 'jw-paginate';
import {
  FIND_ASSETS_FAIL,
  FIND_ASSETS_REQUEST,
  FIND_ASSETS_SUCCESS,
  REMOVE_STORE_ASSET,
  STORE_ASSET,
} from '../constants';

export const findAssetsReducer = (
  state = {
    loading: false,
    assets: [],
    error: null,
    assetPageObject: null,
  },
  action
) => {
  switch (action.type) {
    case FIND_ASSETS_REQUEST:
      return { ...state, loading: true };
    case FIND_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        assets: action.payload.assets,
        error: null,
        assetPageObject: jwpaginate(
          action.payload.totalItems,
          action.payload.currentPage,
          action.payload.pageSize,
          6
        ),
      };
    case FIND_ASSETS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storeAssetReducer = (
  state = {
    asset: null,
  },
  action
) => {
  switch (action.type) {
    case STORE_ASSET:
      return { ...state, asset: action.payload };
    case REMOVE_STORE_ASSET:
      return { ...state, asset: null };
    default:
      return state;
  }
};
