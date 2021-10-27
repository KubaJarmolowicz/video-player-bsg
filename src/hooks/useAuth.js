import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import { actions } from "assets/data/stateManagement";
import { useStateMachine } from "./useStateMachine";
import { TokenContext } from "providers/TokenProvider";
import { UserContext } from "providers/UserProvider";
import { BASE_URL, endpoints } from "assets/data/api";

const URL = `${BASE_URL}${endpoints.authorization}`;

export const AuthContext = React.createContext({
  shouldAllowAcces: false,
  handleLogIn: () => {},
  compareState: () => {},
});

const AuthProvider = ({ children }) => {
  const [shouldAllowAcces, setShouldAllowAcces] = useState(false);

  const { compareState, updateState } = useStateMachine();

  const { setToken } = useContext(TokenContext);
  const { setIsRegistered, setFullname } = useContext(UserContext);

  const handleLogIn = useCallback((data) => {
    const requestBody = {
      Username: data.username,
      Password: data.password,
      Device: {
        Name: "7a6a86e5-356f-4795-8998-305e1b205531",
        PlatformCode: "WEB",
      },
    };

    updateState(actions.SET_LOADING);
    axios
      .post(URL, { ...requestBody })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
            User: { FullName },
          },
        }) => {
          setToken(Token);
          setFullname(FullName);
          setIsRegistered(true);
          setShouldAllowAcces(true);
        }
      )
      .catch((e) => {
        updateState(actions.SET_ERROR);
        setTimeout(() => updateState(actions.SET_IDLE), 10000);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        shouldAllowAcces,
        handleLogIn,
        compareState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw Error("useAuth must be invoked from within AuthProvider");
  }

  return auth;
};

export default AuthProvider;
