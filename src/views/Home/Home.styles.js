import styled from "styled-components";
import "assets/fonts/fonts.css";

export const HomeWrapper = styled.div`
  display: grid;
  min-width: 100vw;
  min-height: 100vh;
  border: 1px solid red;
  grid-template-columns: 10vw 1fr;
  grid-template-rows: 15vh 1fr 1fr 10vh;
  background-color: ${({ theme }) => theme.colors.darkPurple};
`;

export const AppbarWrapper = styled.header`
  grid-column: span 2;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SideNavWrapper = styled.nav`
  grid-column: span 1;
  grid-row: span 3;
  border: 1px solid green;
`;

export const ScrollableListWrapper = styled.section`
  grid-column: span 1;
  grid-row: span 1;
  border: 1px solid purple;
  padding: ${({ theme }) => theme.padding.x1} ${({ theme }) => theme.padding.x2};

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
`;

export const ListTitle = styled.h2`
  font-family: "Montserrat";
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
`;

export const FooterWrapper = styled.footer`
  grid-column: span 1;
  grid-row: span 1;
  border: 1px solid orange;
`;
