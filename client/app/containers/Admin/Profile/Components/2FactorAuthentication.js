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
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import {
  Input,
  DatePicker,
  Checkbox,
} from '../../../../components/customComponents';

import { DATE_FORMAT } from '../../../App/constants';

const key = 'userPersonalInformationPage';

export const TwoFactor = props => {
  const {
    classes,
    twoFactor,
    errors,
    loading: { loadTwoFactor },
  } = props;
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.clearError();
    props.loadTwoFactorRequest();
  }, []);

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    props.setValue({
      name: 'twoFactor',
      key: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    props.addTwoFactorRequest();
  };

  return loadTwoFactor ? (
    <>Loading</>
  ) : (
    <div className="d-flex flex-col">
      <Checkbox
        label="Enable two factor authentication"
        checked={twoFactor.is_two_fa}
        name="is_two_fa"
        type="checkbox"
        color="primary"
        onChange={handleChange}
      />
      <button
        type="button"
        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
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
