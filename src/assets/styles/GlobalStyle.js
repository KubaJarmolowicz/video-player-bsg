import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html{
    box-sizing: border-box;
}

*,*::before, *::after{
    box-sizing: inherit;
}


body{
    font-family: 'Montserrat', sans-serif;
    margin: 0;
}

a, button {
   font-family: 'Montserrat', sans-serif;
   text-decoration: none;
}

`;
