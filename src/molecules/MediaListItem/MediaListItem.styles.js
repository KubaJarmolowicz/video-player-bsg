import styled from "styled-components";

export const StyledItem = styled.li`
  min-width: 500px;
  min-height: 100%;
  border: 1px solid black;
`;

export const ImgWrapper = styled.div`
  border: 1px solid steelblue;
  img {
    display: block;
    max-width: 100%;
    //object-fit: cover;
    aspect-ratio: 16 / 9;
  }
`;
