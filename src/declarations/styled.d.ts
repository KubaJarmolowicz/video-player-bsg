import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      darkGrey: string;
      error: string;
      darkPurple: string;
      lightPurple: string;
    };
    fontSize: {
      xxl: string;
      xl: string;
      l: string;
      m: string;
      s: string;
    };
    padding: {
      x1: string;
      x2: string;
    };
  }
}
