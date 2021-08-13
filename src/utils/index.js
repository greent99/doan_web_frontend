export * from './calculation';
export * from './generateHeaderTitle';
export * from './createAuthorizedRequestHeader';
export * from './createToast';
export * from './userList.util';
export * from './enum.util';
export * from './validation';
export * from './URLgenerator';

export const getErrorMessageFromResponse = (error) =>
  error.response && error.response.data.message ? error.response.data.message : error.message;

export const assetTableHeaders = [
  {
    name: 'Asset Code',
    sortBy: 'assetCode',
  },
  {
    name: 'Asset Name',
    sortBy: 'assetName',
  },
  {
    name: 'Category',
    sortBy: 'categoryName',
  },
  {
    name: 'State',
    sortBy: 'state',
  },
];
