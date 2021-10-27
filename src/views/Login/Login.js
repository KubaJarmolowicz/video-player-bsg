import React from "react";
import { useAuth } from "hooks/useAuth";
import { Redirect } from "react-router";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import { LoginViewWrapper, FormWrapper, GuestLoginBtn } from "./Login.styles";
import { states } from "assets/data/stateManagement";
import Error from "components/molecules/Error/Error";

const Login = () => {
  const { shouldAllowAcces, handleLogIn, compareState } = useAuth();

  if (shouldAllowAcces) {
    return <Redirect to="/home" />;
  } else {
    return (
      <LoginViewWrapper>
        <FormWrapper>
          <h2>Better Video Player</h2>
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
