import React, { FC } from "react";
import { Wrapper } from "./Error.styles";
import { ErrorMsgTypes } from "assets/data/errorMessages";

interface IErrorProps {
  messageType: keyof typeof ErrorMsgTypes;
}

const Error: FC<IErrorProps> = ({ messageType = "DEFAULT" }) => {
  return (
    <Wrapper>
      <h3>Oops!</h3>
      <p>{ErrorMsgTypes[messageType] ?? ErrorMsgTypes.DEFAULT}</p>
    </Wrapper>
  );
};

export default Error;
