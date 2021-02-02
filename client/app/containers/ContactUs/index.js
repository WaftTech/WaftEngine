import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
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
  makeSelectContactDetail, makeSelectErrorMsg, makeSelectIsRequesting,  makeSelectError,
  makeSelectSuccess
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
    const { isRequesting, contactDetail,  errors } = this.props;
    const { name, email, subject, message } = this.state;

    return (
      <div className="">
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="text-4xl mb-4">Contact Us</h1>
        </div>
        <div className="container mx-auto my-10">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-full md:w-1/2">
              
        <h2 class="text-xl font-bold">Get In Touch With Us</h2>
            <div className="flex flex-wrap justify-start lg:justify-between lg:px-2">
                <div className="w-full lg:w-1/2 pb-4 m-0 lg:-ml-2">
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
                    <div id="component-error-text">{errors.name}</div>
                  )}
                </div>
                <div className="w-full lg:w-1/2 pb-4 m-0 lg:-mr-2">
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
                    <div id="component-error-text">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="w-full pb-4">
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
                  <div id="component-error-text">{errors.subject}</div>
                )}
              </div>
              <div className="w-full pb-4">
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
                  <div id="component-error-text">{errors.message}</div>
                )}
              </div>

              {isRequesting && isRequesting == true ? (
                <CircularProgress color="primary" disableShrink />
              ) : (
                  <form onSubmit={this.onSubmit}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={this.onChange}
                    />
                  </form>
                )}

              <button
                type="button"
                className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
                disabled={isRequesting}
                onClick={this.handleSave}
              >
                Save Message
              </button>
              {/* <div>
                <h1>{this.props.error}</h1>
              </div> */}
            </div>

            <div className="w-full mt-10 sm:w-full md:w-1/2 md:pl-10 md:mt-0">
              <StaticContentDiv contentKey="contactdetail" />
            </div>
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
  error: makeSelectErrorMsg(),
  errors: makeSelectError(),
  contactDetail: makeSelectContactDetail(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'contactUs', reducer });
const withSaga = injectSaga({ key: 'contactUs', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(ContactUs);
