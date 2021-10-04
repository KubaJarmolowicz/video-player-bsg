import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "assets/styles/GlobalStyle";
import { theme } from "assets/styles/theme";
import TokenProvider from "providers/TokenProvider";
import Splash from "views/Splash/Splash";

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TokenProvider>
          <Switch>
            <Route path="/" exact>
              <Splash />
            </Route>
          </Switch>
        </TokenProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
