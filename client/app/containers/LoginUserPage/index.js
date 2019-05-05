/**
 *
 * LoginUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login';

import Link from 'react-router-dom/Link';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import logo from '../../images/logo.png';

const LoginUserPage = ({ classes, loginRequest, loginWithFbRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h3>LOGIN</h3>
        <form className={classes.form} onSubmit={handleSubmit}>
          <UsernameInput />
          <PasswordInput />
          <br />
          <Button variant="contained" color="primary" type="submit">
            LOGIN
          </Button>
        </form>
        <br />
        <br />
        <Link className={classes.smallFont} to="/forgot-password-user">
          Forgot Password?
        </Link>
        <Link className={classes.smallFont} to="/signup-user">
          Not a user?
        </Link>
        <a href="http://localhost:5050/api/user/login/facebook">fb login</a>
        <FacebookLogin
          appId="308391736756480"
          autoLoad={true}
          fields="id,email,name"
          callback={loginWithFbRequest}
        />
      </div>
    </div>
  );
};

LoginUserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
  loginWithFbRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginUserPage', reducer });
const withSaga = injectSaga({ key: 'loginUserPage', saga });

const styles = {
  container: {
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    background: '#EFEFF4',
    minHeight: '100vh',
  },
  card: {
    background: '#fff',
    padding: 40,
    width: 350,
    margin: '0 auto',
  },
  smallFont: {
    fontSize: 12,
    textDecoration: 'none',
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '20px 0',
    marginBottom: '15px',
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center',
  },
  cardFooter: {
    paddingTop: '0rem',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important',
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0',
  },
  inputIconsColor: {
    color: '#495057',
  },
  logo: { maxWidth: '100%' },
};

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);

// AQBctTfJi-stcqmJvATGkT07SD6d_azsXDfBiEbqr5x9ckIdVwm7wugfeptl00vK4qgNDPALuuQOlVFddmwE68n8H9sWyMWPjZM98sM2fU8bWCfVfDjxNfl6iwf_gdzDYyC8Ue0Y3EgcwTmzcG-YV7LVF-yoPONR2cypKBlFJoWOArPH0DCfOk__0ueQgpToyEbYCkID2FMHjzYdbz7I_r0wp7cvxGpv-sFXXxKTp8pF5YOBP8b_I-vQ56LrwDjVFvqjTCG0ay1muu-FW9ElA9qa0GuXziO2cEP4j6l_5qvTzLhb97iR8txZTwuUaUFLhvdHjbdF_COul78Tyz1-gj7u#_=_

// g9B4_0XIAM9ROTM-H0xCV_sL7Iy0sjkLzy0kHfoZSfw.eyJ1c2VyX2lkIjoiMTA1MDExNjE0MDU1NzE0IiwiY29kZSI6IkFRRHR0Y2VFLWhjZHF1OG93WU1iMWI4Y1RTTVV4VUlMT3otb0U0SGFQOEo4QnNxRXlESzdENDVBUHBod3AxVkN0UlBpQjRPZ0dEVmk3SmVkNjZhT2xyWmxua3VSZ2E3UEhhZjRLaDZrQ01VeU10R2VwdllpSFoxZUlaWUVOX1p3cHV2SllKellJOGVWbDNLWEJYZmtWQWszV2JMU05WdHVmSXBmcWhncVlxZDlCVy1NUmYxNFZmQVd6Y09FMnVVeG81RmxOMXZZOGtTa1RTSDlhb2tmbVFPY2c5RnBpQ2lSMnJRLXBqYzRJRWhjaEtKeGkwR0tyMEJBOHF5eGJwTlFWY2F2VEpEUWtjZktCLTJ4Q09TYmdXSDh6YThpZ2gwSjQwNGh4YWs0ZHNjc0VhNk5lMDdwRXAzNWVMN2FzZVZ2WC1hcnJwVUxiTjlCS2dxdkhzd2FlTzVtIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE1NTcwNTcwMDl9
// 5nXCpxWflDKs0cVgbe5QyLHNtxzztDfTntj642gZ8_A.eyJ1c2VyX2lkIjoiMTA1MDExNjE0MDU1NzE0IiwiY29kZSI6IkFRQnduaUZmdTNHZlZlUEtJS25WLXdPbFJQQ2xTOEoxRlJzZHFpU0ZIWWlzNURBVTdoOXAwZ0dJNTB6Z0djRElxSU16dDZ3THNpNWFsd2ctX0x2Y2lBVlhuMTJMM1RxV3pjUGlYanozQkZGdkp3ODhnUzV3bG9QWVdTMEU0ZGY0NXdhaWJvRDdWSU5CZjlRXzczMWtxN29RWkVSNmI0NXdHR0NFa1RKRlllb192bFQtcURMcHUySzRpdVhFcGNqZ19fZTRMcmFNSzJjOFJTSWlxU04xVkpPVlpxRVZuaE9CakE0bThCYXRxX3JET21MelEwcUlJYmZGQXdpZ2lNemg2N3BvdWp1ZmRJSGtlUHFyNldRUUlEZk1jMlRpY085a3dlRXM4RDVlRjBBSmx1VlJULVRLMHQ1U1VBNG5DWTNndmh0STFaOWg4aFM4S3Y1SUVod2FwbHdTIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE1NTcwNTY3MDJ9

// 5nXCpxWflDKs0cVgbe5QyLHNtxzztDfTntj642gZ8_A.eyJ1c2VyX2lkIjoiMTA1MDExNjE0MDU1NzE0IiwiY29kZSI6IkFRQnduaUZmdTNHZlZlUEtJS25WLXdPbFJQQ2xTOEoxRlJzZHFpU0ZIWWlzNURBVTdoOXAwZ0dJNTB6Z0djRElxSU16dDZ3THNpNWFsd2ctX0x2Y2lBVlhuMTJMM1RxV3pjUGlYanozQkZGdkp3ODhnUzV3bG9QWVdTMEU0ZGY0NXdhaWJvRDdWSU5CZjlRXzczMWtxN29RWkVSNmI0NXdHR0NFa1RKRlllb192bFQtcURMcHUySzRpdVhFcGNqZ19fZTRMcmFNSzJjOFJTSWlxU04xVkpPVlpxRVZuaE9CakE0bThCYXRxX3JET21MelEwcUlJYmZGQXdpZ2lNemg2N3BvdWp1ZmRJSGtlUHFyNldRUUlEZk1jMlRpY085a3dlRXM4RDVlRjBBSmx1VlJULVRLMHQ1U1VBNG5DWTNndmh0STFaOWg4aFM4S3Y1SUVod2FwbHdTIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE1NTcwNTY3MDJ9
