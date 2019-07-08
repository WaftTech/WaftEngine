import { createGlobalStyle } from 'styled-components';
import mFontttf from './assets/font/MaterialIcons-Regular.ttf';
import mFonteot from './assets/font/MaterialIcons-Regular.eot';
import mFontwoff2 from './assets/font/MaterialIcons-Regular.woff2';
import mFontwoff from './assets/font/MaterialIcons-Regular.woff';

const GlobalStyle = createGlobalStyle`@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;src: url(${mFonteot}); /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(${mFontwoff2}) format('woff2'),
    url(${mFontwoff}) format('woff'),
    url(${mFontttf}) format('truetype');

}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
`;

export default GlobalStyle;
