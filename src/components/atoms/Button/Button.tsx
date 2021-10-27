import styled from "styled-components";

interface IButton {
  isBig: boolean;
}

export const Button = styled.button<IButton>`
  cursor: pointer;
  margin: 15px 0;
  padding: ${({ isBig }) => (isBig ? "10px 38px" : "7px 20px")};
  font-size: ${({ isBig, theme: { fontSize } }) =>
    isBig ? fontSize.m : fontSize.s};
  background-color: ${({ theme }) => theme.colors.lightPurple};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};

  &:disabled {
    opacity: 0.7;
    cursor: initial;
  }
`;
