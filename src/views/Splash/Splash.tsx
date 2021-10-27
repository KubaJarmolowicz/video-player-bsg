import React from "react";
import { Redirect } from "react-router";
import { SplashWrapper } from "./Splash.styles";
import Loader from "components/atoms/Loader/Loader";
import { States } from "assets/data/stateManagement";
import Error from "components/molecules/Error/Error";
import { useGuestLogin } from "hooks/useGuestLogin";

const Splash = () => {
  const { shouldAllowAcces, shouldRedirectToLogin, compareState } =
    useGuestLogin();

  if (shouldAllowAcces) {
    return <Redirect to="/home" />;
  } else if (shouldRedirectToLogin) {
    return <Redirect to="/" exact />;
  } else {
    return (
      <SplashWrapper>
        <h2>BETTER VOD PLAYER</h2>
        {compareState(States.LOADING) && <Loader />}
        {compareState(States.ERROR) && <Error messageType="REDIRECT" />}
      </SplashWrapper>
    );
  }
};

export default Splash;
