import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { TokenContext } from "providers/TokenProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useContext(TokenContext);

  return token.length ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/" exact />
  );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
