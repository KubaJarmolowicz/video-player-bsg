import styled from "styled-components";

export const StyledItem = styled.li`
  min-width: 400px;
`;

export const StyledMovieTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.l};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
