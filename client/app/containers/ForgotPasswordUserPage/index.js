/**
 *
 * ForgotPasswordUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import UsernameInput from './components/UsernameInput';
import logo from '../../images/logo.png';

const ForgotPasswordUser = ({ classes, forgotPasswordRequest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    forgotPasswordRequest();
  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <img className={classes.logo} src={logo} alt="logo" style={{ width: '60%', marginBottom: '10px' }} />
        <h3 className="text-2xl font-bold">FORGOT PASSWORD</h3>
        <br />
        <form className={classes.form} onSubmit={handleSubmit}>
          <UsernameInput />

          <Button className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme" variant="contained" color="primary" type="submit">
            SUBMIT
          </Button>

        </form>

        <Link className={classes.smallFont} to="/login-user">
          LOGIN?
        </Link>
        <Link className={classes.smallFont} to="/signup-user">
          Not a user?
        </Link>
      </div>
    </div>
  );
};

ForgotPasswordUser.propTypes = {
  classes: PropTypes.object.isRequired,
  forgotPasswordRequest: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPasswordUserPage', reducer });
const withSaga = injectSaga({ key: 'forgotPasswordUserPage', saga });

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
)(ForgotPasswordUser);
