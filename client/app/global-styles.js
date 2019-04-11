import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body { margin:0; font-family:sans-serif;}
.container { max-width:1140px; margin:0 auto;}
.justify-end { justify-content:flex-end;}
.justify-center { justify-content:center;}
.mb-2 { margin-bottom:20px;}

`;

export default GlobalStyle;
