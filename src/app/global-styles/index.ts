import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  
  * {
    box-sizing:border-box;
  } 
  body {
    font-size: 16px;
    line-height: 1.3;
    min-width: 360px;
    margin: 0;
    padding: 0;
  }
`;