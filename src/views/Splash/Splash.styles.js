import styled from "styled-components";

export const SplashWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightPurple};
  display: flex;
  justify-content: center;
  align-items: center;
`;
