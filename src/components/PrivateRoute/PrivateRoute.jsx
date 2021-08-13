import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { validateUserData } from '../../utils';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { userData } = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (validateUserData(userData)) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(userData.user.userType) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: '/' }} />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
