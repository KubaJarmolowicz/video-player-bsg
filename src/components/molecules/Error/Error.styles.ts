import styled from "styled-components";

export const Wrapper = styled.div`
  height: 225px;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.padding.x1};
  color: ${({ theme }) => theme.colors.error};
  border: 3px solid ${({ theme }) => theme.colors.error};
  border-radius: 15px;

  p {
    margin-top: 2rem;
  }
`;
