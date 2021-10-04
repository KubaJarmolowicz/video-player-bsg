import styled from "styled-components";

export const StyledItem = styled.li`
  min-width: 500px;
  min-height: 100%;
`;

export const StyledMovieTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.l};
`;
