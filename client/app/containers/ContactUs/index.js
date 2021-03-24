import PropTypes from 'prop-types';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import StaticContentDiv from '../../components/StaticContentDiv';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { RECAPTCHA_SITE_KEY } from '../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectContactDetail,
  makeSelectErrorMsg,
  makeSelectIsRequesting,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';

const recaptchaRef = React.createRef();
class ContactUs extends React.Component {
  state = { name: '', email: '', subject: '', message: '', reCaptcha: '' };

  componentDidMount() { }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.success !== this.props.success && nextProps.success) {
      this.setState({ name: '', email: '', subject: '', message: '' }, () => {
        window.grecaptcha && window.grecaptcha.reset();
      });
    }
  }

  handleSave = () => {
    this.props.saveContactRequest(this.state);
  };

  onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.onSubmit(recaptchaValue);
  };

  onChange = e => {
    this.setState({
      reCaptcha: e,
    });
  };

  render() {
    const { isRequesting, contactDetail, errors, errorMsg } = this.props;
    const { name, email, subject, message } = this.state;

    return (
      <div className="">
        <Helmet>
          <title>Contact</title>
        </Helmet>
        <div className="container mx-auto py-10 px-5 sm:px-0">
          <div className="max-w-xl">
            <h1 class="text-2xl">Contact</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                  htmlFor="name"
                >
                  Name
                  </label>
                <input
                  onChange={this.handleChange('name')}
                  value={name}
                  className="inputbox"
                  id="name"
                  type="text"
                />
                {errors && errors.name && (
                  <div className="error">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="mt-10 lg:mt-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                  htmlFor="email"
                >
                  Email
                  </label>
                <input
                  value={email}
                  onChange={this.handleChange('email')}
                  className="inputbox"
                  id="email"
                  type="text"
                />
                {errors && errors.email && (
                  <div className="error">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mt-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                htmlFor="subject"
              >
                Subject
                </label>
              <input
                value={subject}
                onChange={this.handleChange('subject')}
                className="inputbox"
                id="subject"
                type="text"
              />
              {errors && errors.subject && (
                <div className="error">
                  {errors.subject}
                </div>
              )}
            </div>
            <div className="w-full mt-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                htmlFor="subject"
              >
                Message
                </label>
              <textarea
                rows="4"
                value={message}
                onChange={this.handleChange('message')}
                className="inputbox"
                id="message"
                type="text"
              />
              {errors && errors.message && (
                <div className="error">
                  {errors.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              {isRequesting && isRequesting == true ? (
                <>Loading</>
              ) : (
                  <form onSubmit={this.onSubmit}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={this.onChange}
                    />
                  </form>
                )}
              {errorMsg && errorMsg !== '' && (
                <div className="error">
                  {errorMsg}
                </div>
              )}
            </div>
            <button
              type="button"
              className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
              disabled={isRequesting}
              onClick={this.handleSave}
            >
              Send Message
              </button>
          </div>
        </div>
      </div>
    );
  }
}

ContactUs.propTypes = {
  saveContactRequest: PropTypes.func.isRequired,
  ContactDetailRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  success: makeSelectSuccess(),
  errorMsg: makeSelectErrorMsg(),
  errors: makeSelectError(),
  contactDetail: makeSelectContactDetail(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'contactUs', reducer });
const withSaga = injectSaga({ key: 'contactUs', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(ContactUs);
