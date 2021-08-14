export const staffNavList = [
  {
    path: '/',
    name: 'Home',
    matchingRoutes: ['/'],
  },
];

export const anonymousNavList = [
  {
    path: '/login',
    name: 'Login',
    matchingRoutes: ['/login'],
  },
];

export const adminNavList = [
  {
    path: '/',
    name: 'Home',
    matchingRoutes: ['/'],
  },
  {
    path: '/users',
    name: 'Manage User',
    matchingRoutes: ['/users', '/users/create', 'users/edit'],
  },
  {
    path: '/categories',
    name: 'Manage Category',
    matchingRoutes: ['/categories', '/categories/create', 'categories/edit'],
  },
  {
    path: '/fields',
    name: 'Manage Field',
    matchingRoutes: ['/fields', '/fields/create', 'fields/edit'],
  },
  {
    path: '/courses',
    name: 'Manage Courses',
    matchingRoutes: ['/courses', '/courses/create', 'courses/edit'],
  },
];
