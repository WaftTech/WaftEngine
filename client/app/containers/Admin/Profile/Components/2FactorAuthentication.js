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
    <div className="ml-4 p-4 border">Loading</div>
  ) : (
    <>
      <Modal
        open={showGoogleTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
      >
        <div>
          <Input
            id="two_factor_authentication"
            name="two_factor_authentication"
            label="Google Two factor authentication code"
            disabled
            readOnly
            error={errors.two_fa_ga_auth_secret}
            value={twoFactor && twoFactor.google_authenticate.auth_secret_setup}
          />
        </div>
        <div className="py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
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
          <Input
            id="code"
            name="code"
            label="Enter Your code"
            error={errors.code}
            value={twoFactor && twoFactor.code}
            onChange={e => handleChange(e, 'google_authenticate')}
          />
          <p className="italic mt-2">
            Note : Enter the code from Authentication App
          </p>
        </div>
      </Modal>
      <div className="ml-4 p-4 border">
        <div className="checkbox">
          <input
            checked={twoFactor.email.is_authenticate}
            onChange={handleChecked}
            id="is_active"
            type="checkbox"
          />
          <label htmlFor="is_active">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Enable email authentication
          </label>
        </div>

        <div className="checkbox">
          <input
            checked={twoFactor.google_authenticate.is_authenticate}
            onChange={handleChecked}
            id="is_active"
            type="checkbox"
          />
          <label htmlFor="is_active">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Enable Google two factor authentication
          </label>
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
  classes: PropTypes.object.isRequired,
  twoFactor: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  twoFactor: makeSelectTwoFactor(),
  loading: makeSelectLoading(),
  helperObj: makeSelectHelperObj(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(TwoFactor);
