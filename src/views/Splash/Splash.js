import React, { useEffect, useContext } from "react";
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
          console.log("from splash -> token: ", Token);
          setToken(Token);
        }
      )
      .catch((e) => console.log(e));
  }, []);

  return (
    <SplashWrapper>
      <h2>Hello World</h2>
    </SplashWrapper>
  );
};

Splash.propTypes = {};

export default Splash;
