import React, { useState, useContext, useEffect, FC } from "react";
import axios, { AxiosResponse } from "axios";
import { Actions } from "assets/data/stateManagement";
import { useStateMachine } from "./useStateMachine";
import { TokenContext } from "providers/TokenProvider";
import { BASE_URL, Endpoints } from "assets/data/api";
import { State } from "assets/data/stateManagement";

const URL = `${BASE_URL}${Endpoints.AUTHORIZATION}`;

export interface IBasicLoginRequest {
  Device: {
    Name: string;
    PlatformCode: string;
  };
}

export interface IBasicLoginResponse {
  User: {
    Id: string;
    UserName: string;
    FullName: string;

    ClientRoles: string[];
  };
  AuthorizationToken: {
    AuthResult: string;
    Token: string;
    TokenExpires: string;
  };

  ResultType: string;
}

const requestBody = {
  Device: {
    Name: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    PlatformCode: "WEB",
  },
};

export const GuestLoginContext = React.createContext({
  shouldAllowAcces: false,
  shouldRedirectToLogin: false,
  compareState: (state: State) => (state ? true : false),
});

const GuestLoginProvider: FC = ({ children }) => {
  const [shouldAllowAcces, setShouldAllowAcces] = useState(false);
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  const { setToken } = useContext(TokenContext);

  const { compareState, updateState } = useStateMachine();

  useEffect(() => {
    updateState(Actions.SET_LOADING);
    axios
      .post<IBasicLoginRequest, AxiosResponse<IBasicLoginResponse>>(URL, {
        ...requestBody,
      })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
          },
        }) => {
          updateState(Actions.SET_SUCCESS);
          setToken(Token);
          setShouldAllowAcces(true);
        }
      )
      .catch((e) => {
        updateState(Actions.SET_ERROR);
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
