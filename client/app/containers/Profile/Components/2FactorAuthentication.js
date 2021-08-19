/* eslint-disable no-underscore-dangle */
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import Modal from '../../../components/Modal';
import * as mapDispatchToProps from '../actions';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectHelperObj,
  makeSelectLoading,
  makeSelectLoadingObj,
  makeSelectTwoFactor,
} from '../selectors';

import { DATE_FORMAT } from '../../App/constants';
import { FaCheck } from 'react-icons/fa';

const key = 'userPersonalInformationPage';

export const TwoFactor = props => {
  const {
    classes,
    twoFactor,
    errors,
    helperObj: { showGoogleTwoFactor },
    loading,
    loadingObj: { loadTwoFactor, addEmailAuth, addGoogleAuth, setGoogleCode },
  } = props;
  useInjectSaga({ key, saga });

  const handleClose = () => {
    props.setValue({
      name: 'helperObj',
      key: 'showGoogleTwoFactor',
      value: false,
    });
  };

  useEffect(() => {
    handleClose();
    props.clearError();
    props.loadTwoFactorRequest();
  }, []);

  const handleChecked = event => {
    props.setValue({
      name: 'twoFactor',
      key: event.target.name,
      value: {
        is_authenticate: event.target.checked,
      },
      // value:  event.target.checked ,
    });
    if (event.target.name === 'email') {
      props.addEmailTwoFactorRequest({
        is_authenticate: event.target.checked,
      });
    } else if (event.target.name === 'google_authenticate') {
      props.addGoogleTwoFactorRequest({
        is_authenticate: event.target.checked,
      });
    }
  };

  const handleChange = (event, name) => {
    props.setValue({
      name: 'twoFactor',
      key: name,
      value: {
        ...twoFactor.google_authenticate,
        [event.target.name]: event.target.value,
      },
      // value:  event.target.checked ,
    });
    props.clearData({ name: 'errors' });
  };

  const handleSubmitCode = () => {
    props.setGoogleTwoFactorRequest();
  };

  return loadTwoFactor ? (
    <div className="ml-4 p-4 ">Loading</div>
  ) : (
    <>
      <Modal
        open={showGoogleTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
        width="sm"
        buttonLabel2={setGoogleCode ? 'Sending...' : 'Send'}
      >
        <div>
          <label>Google Two factor authorization code</label>
          <input
            id="two_factor_authorization"
            name="two_factor_authorization"
            disabled
            readOnly
            value={twoFactor && twoFactor.google_authenticate.auth_secret_setup}
          />
          <div className="error">{errors.two_fa_ga_auth_secret}</div>
        </div>
        <div className="m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="250"
            fill="true"
          >
            <path
              d={
                twoFactor &&
                twoFactor.google_authenticate &&
                twoFactor.google_authenticate.qrcode &&
                twoFactor.google_authenticate.qrcode.path
              }
              className="qr-code"
            />
          </svg>
        </div>
        <div>
          <label>Enter Your Code</label>
          <input
            id="code"
            name="code"
            value={twoFactor && twoFactor.code}
            onChange={e => handleChange(e, 'google_authenticate')}
          />
          <div className="error">{errors.code}</div>

          <p className="italic mt-2">
            Note : Enter the code from Authentication App
          </p>
        </div>
      </Modal>
      <div className="ml-4 p-4">
        <div className="checkbox">
          <input
            checked={twoFactor.email.is_authenticate}
            id="email"
            type="checkbox"
            onChange={handleChecked}
          />
          <label htmlFor="email">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Enable Email two factor authorization
          </label>
        </div>

        {addEmailAuth && 'Loading...'}

        <div className="checkbox">
          <input
            checked={twoFactor.google_authenticate.is_authenticate}
            id="google_authenticate"
            type="checkbox"
            onChange={handleChecked}
          />
          <label htmlFor="google_authenticate">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Enable Google two factor authorization
          </label>
        </div>
        {addGoogleAuth && 'Loading...'}
      </div>
    </>
  );
};

TwoFactor.propTypes = {
  loadTwoFactorRequest: PropTypes.func,
  addTwoFactorRequest: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  twoFactor: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  twoFactor: makeSelectTwoFactor(),
  loading: makeSelectLoading(),
  helperObj: makeSelectHelperObj(),
  loadingObj: makeSelectLoadingObj(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withConnect)(TwoFactor);
