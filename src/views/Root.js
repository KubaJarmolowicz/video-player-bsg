import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "components/molecules/PrivateRoute";
import Splash from "views/Splash/Splash";
import Home from "views/Home/Home";
import Login from "views/Login/Login";

const Root = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/splash">
        <Splash />
      </Route>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
    </Switch>
  );
};

export default Root;
