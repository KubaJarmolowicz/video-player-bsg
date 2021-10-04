import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { SplashWrapper } from "./Splash.styles";
import axios from "axios";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";

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
          // REDIRECT HERE ---------------------------------------->
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
        <h2>Hello World</h2>
      </SplashWrapper>
    );
  }
};

Splash.propTypes = {};

export default Splash;
