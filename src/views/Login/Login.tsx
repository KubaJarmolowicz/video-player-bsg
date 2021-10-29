import React, { useContext } from "react";
import { useAuth } from "hooks/useAuth";
import { Redirect } from "react-router";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import { LoginViewWrapper, FormWrapper, GuestLoginBtn } from "./Login.styles";
import { States } from "assets/data/stateManagement";
import Error from "components/molecules/Error/Error";
import { TokenContext } from "providers/TokenProvider";

const Login = () => {
  const { handleLogIn, compareState } = useAuth();
  const { shouldAllowAccess } = useContext(TokenContext);

  if (shouldAllowAccess) {
    return <Redirect to="/splash" />;
  } else {
    return (
      <LoginViewWrapper>
        <FormWrapper>
          <h2>Better Video Player</h2>
          <LoginForm
            handleLogIn={handleLogIn}
            shouldDisableSubmit={compareState(States.LOADING)}
          />
          <GuestLoginBtn
            to="/splash"
            style={{
              pointerEvents: compareState(States.LOADING) ? "none" : "auto",
            }}
          >
            Log In as Guest
          </GuestLoginBtn>
        </FormWrapper>
        {compareState(States.ERROR) && <Error messageType="LOGIN" />}
      </LoginViewWrapper>
    );
  }
};

export default Login;
