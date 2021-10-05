import React, { useContext, useState } from "react";
import { useStateMachine } from "hooks/useStateMachine";
import { Redirect } from "react-router";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";
import axios from "axios";
import { UserContext } from "providers/UserProvider";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import { LoginViewWrapper, FormWrapper, GuestLoginBtn } from "./Login.styles";
import { states, actions } from "assets/data/consts";
import Error from "components/molecules/Error/Error";

const URL = `${BASE_URL}/Authorization/SignIn`;

const Login = () => {
  const [redirect, setRedirect] = useState(null);
  const { compareState, updateState } = useStateMachine();

  const { setToken } = useContext(TokenContext);
  const { setIsRegistered } = useContext(UserContext);

  const handleLogIn = (data) => {
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
      .post(URL, { requestBody })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
          },
        }) => {
          setToken(Token);
          setIsRegistered(true);
          setRedirect(true);
        }
      )
      .catch((e) => {
        updateState(actions.SET_ERROR);
        setTimeout(() => updateState(actions.SET_IDLE), 10000);
      });
  };

  if (redirect) {
    return <Redirect to="/home" />;
  } else {
    return (
      <LoginViewWrapper>
        <FormWrapper>
          <LoginForm
            handleLogIn={handleLogIn}
            shouldDisableSubmit={compareState(states.loading)}
          />
          <GuestLoginBtn
            to="/splash"
            style={{
              pointerEvents: compareState(states.loading) ? "none" : "auto",
            }}
          >
            Log In as Guest
          </GuestLoginBtn>
        </FormWrapper>
        {compareState(states.error) && <Error messageType="login" />}
      </LoginViewWrapper>
    );
  }
};

export default Login;
