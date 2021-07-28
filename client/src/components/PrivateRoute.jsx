import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { LOGIN } from "../constants/routes";

const PrivateRoute = ({ children, ...rest }) => {
  const {
    auth: { isAuthenticated },
    loading: { loading },
  } = useSelector((state) => {
    return {
      auth: state.auth,
      loading: state.loading,
    };
  }, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? <Redirect to={LOGIN} /> : children
      }
    />
  );
};

export default PrivateRoute;
