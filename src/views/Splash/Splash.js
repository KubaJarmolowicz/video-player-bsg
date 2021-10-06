import React, { useState, useEffect, useContext } from "react";
import { useStateMachine } from "hooks/useStateMachine";
import { Redirect } from "react-router";
import { SplashWrapper } from "./Splash.styles";
import axios from "axios";
import { TokenContext } from "providers/TokenProvider";
import Loader from "components/atoms/Loader/Loader";
import { states, actions } from "assets/data/stateManagement";
import Error from "components/molecules/Error/Error";
import { BASE_URL, endpoints } from "assets/data/api";

const URL = `${BASE_URL}${endpoints.authorization}`;

const requestBody = {
  Device: {
    Name: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    PlatformCode: "WEB",
  },
};

const Splash = () => {
  const [redirectToHome, setRedirectToHome] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { setToken } = useContext(TokenContext);

  const { compareState, updateState } = useStateMachine();

  useEffect(() => {
    updateState(actions.SET_LOADING);
    axios
      .post(URL, { ...requestBody })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
          },
        }) => {
          updateState(actions.SET_SUCCESS);
          setToken(Token);
          setRedirectToHome(true);
        }
      )
      .catch((e) => {
        updateState(actions.SET_ERROR);
        setTimeout(() => setRedirectToLogin(true), 2000);
      });
  }, []);

  if (redirectToHome) {
    return <Redirect to="/home" />;
  } else if (redirectToLogin) {
    return <Redirect to="/" exact />;
  } else {
    return (
      <SplashWrapper>
        <h2>BETTER VOD PLAYER</h2>
        {compareState(states.loading) && <Loader />}
        {compareState(states.error) && <Error messageType="redirect" />}
      </SplashWrapper>
    );
  }
};

export default Splash;
