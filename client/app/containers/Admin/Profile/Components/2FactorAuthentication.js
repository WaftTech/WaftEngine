/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import injectSaga, { useInjectSaga } from 'utils/injectSaga';
import FormHelperText from '@material-ui/core/FormHelperText';

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
import {
  Input,
  DatePicker,
  Checkbox,
} from '../../../../components/customComponents';
import Modal from '../../../../components/Modal';

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
        <div>
          <Checkbox
            label="Enable Email two factor authentication"
            checked={twoFactor.email.is_authenticate}
            name="email"
            type="checkbox"
            color="primary"
            onChange={handleChecked}
          />
        </div>
        <div>
          <Checkbox
            label="Enable Google two factor authentication"
            checked={twoFactor.google_authenticate.is_authenticate}
            name="google_authenticate"
            type="checkbox"
            color="primary"
            onChange={handleChecked}
          />
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

const styles = theme => ({});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(TwoFactor);
