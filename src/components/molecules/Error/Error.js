import React from "react";
import { Wrapper } from "./Error.styles";
import { errorMessages } from "assets/data/errorMessages";

const Error = ({ messageType = "default" }) => {
  return (
    <Wrapper>
      <h3>Oops!</h3>
      <p>{errorMessages[messageType] ?? errorMessages.default}</p>
    </Wrapper>
  );
};

export default Error;
