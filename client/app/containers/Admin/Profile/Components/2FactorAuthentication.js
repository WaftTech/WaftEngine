/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';

import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectTwoFactor,
  makeSelectHelperObj,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import Modal from '../../../../components/Modal';
import { FaCheck } from 'react-icons/fa';
import EmailAuth from '../../../../assets/img/EmailAuth.png';
import GoogleAuth from '../../../../assets/img/GoogleAuth.png';
import { DATE_FORMAT } from '../../../App/constants';

const key = 'userPersonalInformationPage';

export const TwoFactor = props => {
  const {
    classes,
    twoFactor,
    errors,
    helperObj: { showGoogleTwoFactor },
    loading: { loadTwoFactor },
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
  };

  const handleSubmitCode = () => {
    props.addTwoFactorRequest();
  };

  return loadTwoFactor ? (
    <>
      <div className="ml-4 flex justify-between px-2">
        <div class="-ml-2 w-1/2  border border-gray-100 rounded p-4 ">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-100 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-100 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-100 rounded"></div>
                <div class="h-4 bg-gray-100 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="-mr-2 w-1/2 border border-gray-100 rounded p-4">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-100 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-100 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-100 rounded"></div>
                <div class="h-4 bg-gray-100 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Modal
        open={showGoogleTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
      >
        <div>
          <label>Google Two factor authorization code</label>
          <p className="text-xs bg-gray-100 rounded p-2">
            {twoFactor && twoFactor.google_authenticate.auth_secret_setup}
          </p>
          {/* <input
            id="two_factor_authorization"
            name="two_factor_authorization"
            disabled
            readOnly
            value={twoFactor && twoFactor.google_authenticate.auth_secret_setup}
          /> */}
          <div className="error">{errors.two_fa_ga_auth_secret}</div>
        </div>
        <div className="py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
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
          <label>Enter Your code</label>
          <input
            id="code"
            className="inputbox"
            name="code"
            value={twoFactor && twoFactor.code}
            onChange={e => handleChange(e, 'google_authenticate')}
          />
          <div className="error">{errors.code}</div>
          <p className="italic mt-2 text-sm">
            Note : Enter the code from Authentication App
          </p>
        </div>
      </Modal>
      <div className="ml-4 p-4 border">
        <div className="flex justify-between px-2">
          <div className="-ml-2 w-1/2 p-4 border rounded">
            <img src={EmailAuth} className="h-16" alt="Email Authentication" />
            <h2 className="text-lg">E-mail Authentication</h2>
            <p>
              Checking your E-mail for authentication will help secure your
              account from unauthorized access.
            </p>
            <div className="checkbox">
              <input
                checked={twoFactor.email.is_authenticate}
                onChange={handleChecked}
                id="is_active_email"
                type="checkbox"
                name="email"
              />
              <label htmlFor="is_active_email">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Enable email authorization
              </label>
            </div>
          </div>
          <div className="-mr-2 w-1/2 p-4 border rounded">
            <img
              src={GoogleAuth}
              className="h-16"
              alt="Google Authentication"
            />
            <h2 className="text-lg">Google Authentication</h2>
            <p>
              Google authentication is a physical security key that is used for
              authentication during account sign in.
            </p>
            <div className="checkbox">
              <input
                checked={twoFactor.google_authenticate.is_authenticate}
                onChange={handleChecked}
                id="is_active_google"
                type="checkbox"
                name="google_authenticate"
              />
              <label htmlFor="is_active_google">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Enable Google two factor authorization
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TwoFactor.propTypes = {
  loadTwoFactorRequest: PropTypes.func.isRequired,
  addTwoFactorRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
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
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withConnect)(TwoFactor);
