import React, { useState, useContext, useCallback, FC } from "react";
import axios, { AxiosResponse } from "axios";
import { Actions } from "assets/data/stateManagement";
import { useStateMachine } from "./useStateMachine";
import { TokenContext } from "providers/TokenProvider";
import { UserContext } from "providers/UserProvider";
import { BASE_URL, Endpoints } from "assets/data/api";
import { State } from "assets/data/stateManagement";
import { IBasicLoginRequest, IBasicLoginResponse } from "hooks/useGuestLogin";

interface IAuth {
  shouldAllowAcces: boolean;
  handleLogIn: (data: ILoginData) => void;
  compareState: (state: State) => boolean;
}

export interface ILoginData {
  Username: string;
  Password: string;
}

type ILoginRequest = ILoginData & IBasicLoginRequest;

type ILoginResponse = IBasicLoginResponse;

const URL = `${BASE_URL}${Endpoints.AUTHORIZATION}`;

export const AuthContext = React.createContext<IAuth>({
  shouldAllowAcces: false,
  handleLogIn: (data: ILoginData) => {
    return;
  },
  compareState: (state: State) => (state ? true : false),
});

const AuthProvider: FC = ({ children }) => {
  const [shouldAllowAcces, setShouldAllowAcces] = useState<boolean>(false);

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

    updateState(Actions.SET_LOADING);
    axios
      .post<ILoginRequest, AxiosResponse<ILoginResponse>>(URL, {
        ...requestBody,
      })
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
        updateState(Actions.SET_ERROR);
        setTimeout(() => updateState(Actions.SET_IDLE), 10000);
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
