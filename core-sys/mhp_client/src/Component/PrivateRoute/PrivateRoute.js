import React from 'react';
import {Route,Navigate} from 'react-router-dom';
  
  function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            isAuthenticated
              ? (
                children
              ) : (
                <Navigate
                  to={{
                    pathname: '/sidebar/seting',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  }
  
  export default PrivateRoute;