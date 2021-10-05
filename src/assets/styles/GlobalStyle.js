import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html{
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.white}
}

*,*::before, *::after{
    box-sizing: inherit;
}


body{
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.darkGrey};
}

a, button {
   font-family: 'Montserrat', sans-serif;
   text-decoration: none;
}

`;
