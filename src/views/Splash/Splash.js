import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { SplashWrapper } from "./Splash.styles";
import axios from "axios";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";
import Loader from "atoms/Loader/Loader";

const URL = `${BASE_URL}/Authorization/SignIn`;

const requestBody = {
  Device: {
    Name: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    PlatformCode: "WEB",
  },
};

const Splash = () => {
  const [redirect, setRedirect] = useState(null);
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    axios
      .post(URL, { requestBody })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
          },
        }) => {
          setToken(Token);
          setRedirect(true);
        }
      )
      .catch((e) => console.log(e));
  }, []);

  if (redirect) {
    return <Redirect to="/home" />;
  } else {
    return (
      <SplashWrapper>
        <h2>BETTER VOD PLAYER</h2>
        <Loader />
      </SplashWrapper>
    );
  }
};

export default Splash;
