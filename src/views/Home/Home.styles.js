import styled from "styled-components";
import "assets/fonts/fonts.css";

export const HomeWrapper = styled.div`
  min-width: 100vw;
  max-height: 100vh;

  display: grid;
  grid-template-columns: 10vw 1fr;
  grid-template-rows: 15vh 1fr 1fr 10vh;

  background-color: ${({ theme }) => theme.colors.darkPurple};
`;

export const AppbarWrapper = styled.header`
  border: 1px solid blue;

  grid-column: span 2;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
`;

export const SideNavWrapper = styled.nav`
  border: 1px solid green;

  grid-column: span 1;
  grid-row: span 3;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
`;

export const ScrollableListWrapper = styled.section`
  border: 1px solid purple;

  grid-column: span 1;
  grid-row: span 1;

  padding: ${({ theme }) => theme.padding.x1} ${({ theme }) => theme.padding.x2};

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
`;

export const ListTitle = styled.h2`
  font-family: "Montserrat";
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
`;

export const FooterWrapper = styled.footer`
  border: 1px solid orange;

  grid-column: span 1;
  grid-row: span 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 700;
`;
