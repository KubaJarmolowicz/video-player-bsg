import { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { TokenContext } from "providers/TokenProvider";

interface IPriavteRoute extends Route {
  path: string;
}

type PrivateRoute = Partial<IPriavteRoute>;

const PrivateRoute: FC<PrivateRoute> = ({ children, ...rest }) => {
  const { token } = useContext(TokenContext);

  return token.length ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/" exact />
  );
};

export default PrivateRoute;
