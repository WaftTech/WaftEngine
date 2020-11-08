import {
  grayColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  whiteColor,
} from '../colors';

const buttonStyle = {
  button: {
    minHeight: 'auto',
    minWidth: 'auto',
    backgroundColor: grayColor[0],
    color: whiteColor,
    border: 'none',
    borderRadius: '3px',
    position: 'relative',
    padding: '12px 30px',
    margin: '.3125rem 1px',
    fontSize: '12px',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0',
    willChange: 'transform',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    lineHeight: '1.42857143',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    '&:hover,&:focus': {
      color: whiteColor,
      backgroundColor: grayColor[0],
    },
    '& .fab,& .fas,& .far,& .fal, &.material-icons': {
      position: 'relative',
      display: 'inline-block',
      top: '0',
      marginTop: '-1em',
      marginBottom: '-1em',
      fontSize: '1.1rem',
      marginRight: '4px',
      verticalAlign: 'middle',
    },
    '& svg': {
      position: 'relative',
      display: 'inline-block',
      top: '0',
      width: '18px',
      height: '18px',
      marginRight: '4px',
      verticalAlign: 'middle',
    },
    '&$justIcon': {
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        marginTop: '0px',
        position: 'absolute',
        width: '100%',
        transform: 'none',
        left: '0px',
        top: '0px',
        height: '100%',
        lineHeight: '41px',
        fontSize: '20px',
      },
    },
  },
  white: {
    '&,&:focus,&:hover': {
      backgroundColor: whiteColor,
      color: grayColor[0],
    },
  },
  rose: {
    backgroundColor: roseColor[0],
    '&:focus,&:hover': {
      backgroundColor: roseColor[0],
    },
  },
  primary: {
    backgroundColor: primaryColor[0],
    '&:hover,&:focus': {
      backgroundColor: primaryColor[1],
    },
  },
  info: {
    backgroundColor: infoColor[0],
    '&:hover,&:focus': {
      backgroundColor: infoColor[1],
    },
  },
  success: {
    backgroundColor: successColor[0],
    '&:hover,&:focus': {
      backgroundColor: successColor[1],
    },
  },
  warning: {
    backgroundColor: warningColor[0],
    '&:hover,&:focus': {
      backgroundColor: warningColor[1],
    },
  },
  danger: {
    backgroundColor: dangerColor[0],
    '&:hover,&:focus': {
      backgroundColor: dangerColor[1],
    },
  },
  simple: {
    '&,&:focus,&:hover': {
      color: whiteColor,
      background: 'transparent',
      boxShadow: 'none',
    },
    '&$rose': {
      '&,&:focus,&:hover,&:visited': {
        color: roseColor[0],
      },
    },
    '&$primary': {
      '&,&:focus,&:hover,&:visited': {
        color: primaryColor[0],
      },
    },
    '&$info': {
      '&,&:focus,&:hover,&:visited': {
        color: infoColor[0],
      },
    },
    '&$success': {
      '&,&:focus,&:hover,&:visited': {
        color: successColor[0],
      },
    },
    '&$warning': {
      '&,&:focus,&:hover,&:visited': {
        color: warningColor[0],
      },
    },
    '&$danger': {
      '&,&:focus,&:hover,&:visited': {
        color: dangerColor[0],
      },
    },
  },
  transparent: {
    '&,&:focus,&:hover': {
      color: 'inherit',
      background: 'transparent',
      boxShadow: 'none',
    },
  },
  disabled: {
    opacity: '0.65',
    pointerEvents: 'none',
  },
  lg: {
    padding: '1.125rem 2.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.333333',
    borderRadius: '0.2rem',
  },
  sm: {
    padding: '0.40625rem 1.25rem',
    fontSize: '0.6875rem',
    lineHeight: '1.5',
    borderRadius: '0.2rem',
  },
  round: {
    borderRadius: '30px',
  },
  block: {
    width: '100% !important',
  },
  link: {
    '&,&:hover,&:focus': {
      backgroundColor: 'transparent',
      color: grayColor[0],
      boxShadow: 'none',
    },
  },
  justIcon: {
    paddingLeft: '12px',
    paddingRight: '12px',
    fontSize: '20px',
    height: '41px',
    minWidth: '41px',
    width: '41px',
    '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
      marginRight: '0px',
    },
    '&$lg': {
      height: '57px',
      minWidth: '57px',
      width: '57px',
      lineHeight: '56px',
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        fontSize: '32px',
        lineHeight: '56px',
      },
      '& svg': {
        width: '32px',
        height: '32px',
      },
    },
    '&$sm': {
      height: '30px',
      minWidth: '30px',
      width: '30px',
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        fontSize: '17px',
        lineHeight: '29px',
      },
      '& svg': {
        width: '17px',
        height: '17px',
      },
    },
  },
};

export default buttonStyle;
