import { combineReducers } from 'redux';
import { getAllUsersReducer } from './userReducers';
import { headerTitleReducer } from './headerReducers';
import { createAssetReducer } from './createAssetReducer';
import { createCategoryReducer } from './createCategoryReducer';
import { authReducer, changePasswordReducer } from './authReducers';
import { createUserReducer, storeUserReducer } from './createUserReducer';
import { getUserReducer } from './getUserReducer';
import { editUserReducer } from './editUserReducer';
import { updateAssetReducer } from './updateAssetReducer';
import { getAssetReducer } from './getAssetReducer';
import { findAssetsReducer, storeAssetReducer } from './assetReducers';
import { getAllCategoriesReducer, getCategoryReducer } from './categoriesReducers';
import { deleteUserReducer } from './deleteUserReducer';

const rootReducer = combineReducers({
  getAllUsersReducer,
  headerTitleReducer,
  createAssetReducer,
  createCategoryReducer,
  authReducer,
  createUserReducer,
  updateAssetReducer,
  getAssetReducer,
  storeUserReducer,
  getUserReducer,
  editUserReducer,
  changePasswordReducer,
  findAssetsReducer,
  storeAssetReducer,
  getAllCategoriesReducer,
  deleteUserReducer,
  getCategoryReducer,
});

export default rootReducer;
