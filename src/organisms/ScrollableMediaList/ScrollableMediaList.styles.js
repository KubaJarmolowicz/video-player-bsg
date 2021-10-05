import styled from "styled-components";

export const ItemsTrack = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;

  & > * + * {
    margin-left: 1rem;
  }
`;
