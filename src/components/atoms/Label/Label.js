import styled from "styled-components";
import "assets/fonts/fonts.css";

export const Label = styled.label`
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;
