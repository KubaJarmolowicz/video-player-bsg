import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html{
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.darkGrey}
}

*::-webkit-scrollbar {
  width: 1rem;
}

*::-webkit-scrollbar-track {
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cbcbcb;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

*,*::before, *::after{
    box-sizing: inherit;
}


body{
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.white};
}

a, button {
   font-family: 'Montserrat', sans-serif;
   text-decoration: none;
}

`;
