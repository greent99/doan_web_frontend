export const validateUserData = (userData) =>
  !userData ||
  !userData.user ||
  !userData.user.username ||
  !userData.access_token ||
  !userData.user.userType;

export const isObjectEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;
