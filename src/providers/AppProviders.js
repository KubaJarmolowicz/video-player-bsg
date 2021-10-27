import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "assets/styles/GlobalStyle";
import { theme } from "assets/styles/theme";
import TokenProvider from "providers/TokenProvider";
import UserProvider from "providers/UserProvider";
import AuthProvider from "hooks/useAuth";
import GuestLoginProvider from "hooks/useGuestLogin";

const AppProviders = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TokenProvider>
          <UserProvider>
            <AuthProvider>
              <GuestLoginProvider>{children}</GuestLoginProvider>
            </AuthProvider>
          </UserProvider>
        </TokenProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppProviders;
