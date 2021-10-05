import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const LoginViewWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const GuestLoginBtn = styled(NavLink)`
  display: inline-block;
  text-align: center;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 2px;

  &:active,
  &:visited {
    color: initial;
  }
`;
