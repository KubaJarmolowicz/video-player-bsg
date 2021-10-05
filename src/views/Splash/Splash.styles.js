import styled from "styled-components";

export const SplashWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.lightPurple};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 1rem;
  }
`;
