import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { actions } from "assets/data/stateManagement";
import { useStateMachine } from "./useStateMachine";
import { TokenContext } from "providers/TokenProvider";
import { BASE_URL, endpoints } from "assets/data/api";

const URL = `${BASE_URL}${endpoints.authorization}`;

const requestBody = {
  Device: {
    Name: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    PlatformCode: "WEB",
  },
};

export const GuestLoginContext = React.createContext({
  shouldAllowAcces: false,
  shouldRedirectToLogin: false,
  compareState: () => {},
});

const GuestLoginProvider = ({ children }) => {
  const [shouldAllowAcces, setShouldAllowAcces] = useState(false);
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  const { setToken } = useContext(TokenContext);

  const { compareState, updateState } = useStateMachine();

  useEffect(() => {
    updateState(actions.SET_LOADING);
    axios
      .post(URL, { ...requestBody })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
          },
        }) => {
          updateState(actions.SET_SUCCESS);
          setToken(Token);
          setShouldAllowAcces(true);
        }
      )
      .catch((e) => {
        updateState(actions.SET_ERROR);
        setTimeout(() => setShouldRedirectToLogin(true), 2000);
      });
  }, []);

  return (
    <GuestLoginContext.Provider
      value={{ shouldAllowAcces, shouldRedirectToLogin, compareState }}
    >
      {children}
    </GuestLoginContext.Provider>
  );
};

export const useGuestLogin = () => {
  const guestLogin = useContext(GuestLoginContext);

  if (!guestLogin) {
    throw Error(
      "useGuestLogin must be invoked from within GuestLoginProvider."
    );
  }

  return guestLogin;
};

export default GuestLoginProvider;
