/* eslint-disable no-underscore-dangle */
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectCode } from '../selectors';


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
          <label className="block uppercase tracking-wide text-gray-800 p-2 mr-2">
            Code
          </label>
          <input
            className="inputbox mr-2"
            id="code"
            type="text"
            value={code || ''}
            onChange={this.handleChange('code')}
          />
          <button
            className="py-2 px-6 rounded text-sm text-white bg-primary uppercase btn-theme"
            onClick={this.handleVerify}
          >
            Verify
          </button>
        </div>
        OR click the button to resend verification code.
        <button
          className="ml-2 py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
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

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(VerifyEmail);
