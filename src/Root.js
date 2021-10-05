import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "assets/styles/GlobalStyle";
import { theme } from "assets/styles/theme";
import TokenProvider from "providers/TokenProvider";
import UserProvider from "providers/UserProvider";

import PrivateRoute from "molecules/PrivateRoute";
import Splash from "views/Splash/Splash";
import Home from "views/Home/Home";
import Login from "views/Login/Login";

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TokenProvider>
          <UserProvider>
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
          </UserProvider>
        </TokenProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
