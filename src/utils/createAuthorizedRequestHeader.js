export const createAuthorizedRequestHeader = (userData) => `Bearer ${userData.access_token}`;
