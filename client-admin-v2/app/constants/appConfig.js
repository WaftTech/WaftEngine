const date = new Date();
const year = date.getFullYear();

const APPCONFIG = {
  brand: 'Ask4Trip',
  year,
  AutoCloseMobileNav: true, // true, false. Automatically close sidenav on route change (Mobile only)
  customizer: false, // Boolean: true, false. Customizer will be removed completely when set to false
  showCustomizer: false, // Boolean: true, false. Customizer will be opened (visible) first time app was loaded if set to true
  color: {
    primary: '#00BCD4',
    success: '#8BC34A',
    info: '#66BB6A',
    infoAlt: '#7E57C2',
    warning: '#FFCA28',
    danger: '#F44336',
    text: '#3D4051',
    gray: '#EDF0F1',
  },
  settings: {
    layout: '1', // String: 1, 2, 3, 4 and add your own
    boxedLayout: false, // Boolean: true, false
    fixedSidenav: false, // Boolean: true, false
    fixedHeader: false, // Boolean: true, false
    collapsedNav: false, // Boolean: true, false
    offCanvasNav: false, // Boolean: true, false
    offCanvasMobileNav: true, // Boolean: true, false. Mobile only, by default, it's true (off canvas)
    sidenavWidth: 240, // Number
    headerShadow: true, // Boolean: true, false
    sidenavShadow: false, // Boolean: true, false
    colorOption: '32', // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
    theme: 'light', // (WIP) String: light, gray, dark
  },
};

export default APPCONFIG;
