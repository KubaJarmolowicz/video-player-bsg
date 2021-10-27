import React, { useState, useContext, useCallback, FC } from "react";
import axios, { AxiosResponse } from "axios";
import { Actions } from "assets/data/stateManagement";
import { useStateMachine } from "./useStateMachine";
import { TokenContext } from "providers/TokenProvider";
import { UserContext } from "providers/UserProvider";
import { BASE_URL, Endpoints } from "assets/data/api";
import { AllowedState } from "hooks/useStateMachine";

interface IAuth {
  shouldAllowAccess: boolean;
  handleLogin: () => void;
  compareState: (state: AllowedState) => boolean;
}

interface ILoginData {
  Username: string;
  Password: string;
}

interface ILoginRequest extends ILoginData {
  Device: {
    Name: string;
    PlatformCode: string;
  };
}

interface ILoginResponse {
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

const URL = `${BASE_URL}${Endpoints.AUTHORIZATION}`;

export const AuthContext = React.createContext({
  shouldAllowAcces: false,
  handleLogIn: (data: ILoginData) => {
    return;
  },
  compareState: (state: AllowedState) => (state ? true : false),
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
