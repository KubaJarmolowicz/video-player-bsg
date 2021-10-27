import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const LoginViewWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > * + * {
    margin-top: 2rem;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  min-height: 30vh;

  padding: ${({ theme }) => theme.padding.x1};

  & > * + * {
    margin-top: 1rem;
  }
`;

export const GuestLoginBtn = styled(NavLink)`
  display: inline-block;

  text-align: center;

  padding: 5px 10px;

  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  border-radius: 2px;

  font-size: ${({ theme }) => theme.fontSize.m};

  color: ${({ theme }) => theme.colors.darkGrey};

  &:active,
  &:visited {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
`;
