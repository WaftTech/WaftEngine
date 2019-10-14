/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectCode } from '../selectors';
import * as mapDispatchToProps from '../actions';

class VerifyEmail extends React.PureComponent {
  static propTypes = {
    setCodeValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
  };

  handleChange = name => event => {
    event.persist();
    this.props.setCodeValue({ key: name, value: event.target.value });
  };

  handleVerify = () => {
    this.props.verifyEmailRequest(this.props.code);
  };

  handleResend = () => {
    this.props.resendCodeRequest();
  };

  render() {
    const { code } = this.props;
    return (
      <React.Fragment>
        <div className="flex">
          <label className="block uppercase tracking-wide text-gray-800 p-2 w-1/5">
            Code
          </label>
          <input
            className="inputbox w-3/5"
            id="code"
            type="text"
            value={code || ''}
            onChange={this.handleChange('code')}
          />
          <button
            className="w-1/5 rounded ml-4 text-sm text-white bg-primary uppercase btn-theme"
            onClick={this.handleVerify}
          >
            Verify
          </button>
        </div>
        OR click the button to resend verification code.
        <button
          className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
          onClick={this.handleResend}
        >
          Resend
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({});

const withStyle = withStyles(styles);

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyle,
)(VerifyEmail);
