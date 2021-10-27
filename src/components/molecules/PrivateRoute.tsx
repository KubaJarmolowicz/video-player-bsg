import { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { TokenContext } from "providers/TokenProvider";

const PrivateRoute: FC<Route> = ({ children, ...rest }) => {
  const { token } = useContext(TokenContext);

  return token.length ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/" exact />
  );
};

export default PrivateRoute;
