const enumUserTypes = {
  ALL: 'All',
  ADMIN: 'Admin',
  STAFF: 'Staff',
};

Object.freeze(enumUserTypes);
const userTypes = Object.keys(enumUserTypes).map((key) => enumUserTypes[key]);
export { enumUserTypes, userTypes };
