import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "providers/UserProvider";
import LoginForm from "organisms/LoginForm/LoginForm";
import { LoginViewWrapper, FormWrapper, GuestLoginBtn } from "./Login.styles";

const URL = `${BASE_URL}/Authorization/SignIn`;

const Login = () => {
  const [redirect, setRedirect] = useState(null);

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
      .catch((e) => console.log(e));
  };

  if (redirect) {
    return <Redirect to="/home" />;
  } else {
    return (
      <LoginViewWrapper>
        <FormWrapper>
          <LoginForm handleLogIn={handleLogIn} />
          <GuestLoginBtn to="/splash">Log In as Guest</GuestLoginBtn>
        </FormWrapper>
      </LoginViewWrapper>
    );
  }
};

export default Login;
