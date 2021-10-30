import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { SplashWrapper } from "./Splash.styles";
import Loader from "components/atoms/Loader/Loader";
import { States } from "assets/data/stateManagement";
import Error from "components/molecules/Error/Error";
import { useGuestLogin } from "hooks/useGuestLogin";
import { TokenContext } from "providers/TokenProvider";

const Splash = () => {
  const { shouldRedirectToLogin, compareState, handleGuestLogin } =
    useGuestLogin();
  const { shouldAllowAccess } = useContext(TokenContext);

  useEffect(() => {
    if (!shouldAllowAccess) {
      handleGuestLogin();
    }
  }, []);

  if (shouldAllowAccess) {
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
