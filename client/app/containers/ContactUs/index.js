import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import StaticContentDiv from '../../components/StaticContentDiv';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectIsRequesting,
  makeSelectSuccess,
  makeSelectErrorMsg,
  makeSelectContactDetail,
} from './selectors';
import * as mapDispatchToProps from './actions';
import { RECAPTCHA_SITE_KEY } from '../App/constants';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};
const recaptchaRef = React.createRef();
class ContactUs extends React.Component {
  state = { name: '', email: '', subject: '', message: '', reCaptcha: '' };

  componentDidMount() {
    // this.props.ContactDetailRequest();
  }

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
    const { isRequesting, contactDetail } = this.props;
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
          <h2 className="text-xl font-bold">GET IN TOUCH</h2>
        <div className="flex">
                  <div className="w-full md:w-1/2 pr-2">
                    <TextField
                      id="name"
                      fullWidth
                      label="Name"
                      type="name"
                      name="name"
                      margin="normal"
                      variant="outlined"
                      value={name}
                      onChange={this.handleChange('name')}
                    />
                  </div>
                  <div className="w-full md:w-1/2  pl-2">
                    <TextField
                      id="email"
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      margin="normal"
                      variant="outlined"
                      value={email}
                      onChange={this.handleChange('email')}
                    />
                  </div>
                </div>
                 
                <TextField
                  id="subject"
                  label="Subject"
                  type="subject"
                  name="subject"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={subject}
                  onChange={this.handleChange('subject')}
                />
                <TextField
                  id="message"
                  label="Message"
                  fullWidth
                  multiline
                  rows="4"
                  margin="normal"
                  placeholder="Message"
                  variant="outlined"
                  value={message}
                  onChange={this.handleChange('message')}
                />
                 
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
                  className="text-white py-2 px-4 rounded mt-4 bg-primary font-bold"
                  disabled={isRequesting}
                  onClick={this.handleSave}
                >
                  Save Message
                </button>
                  <div>
                    <h1>{this.props.error}</h1>
                  </div>
                  </div>
                  
                  <div
                  className="w-full mt-10 sm:w-full md:w-1/2 md:pl-10 md:mt-0">
              <StaticContentDiv contentKey="contactdetail" />
              </div>
          
            {/* <Grid item xs={6} sm={6} md={6}>
                {contactDetail.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contactDetail.description,
                    }}
                  />
                )}
              </Grid> */}
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
  contactDetail: makeSelectContactDetail(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'contactUs', reducer });
const withSaga = injectSaga({ key: 'contactUs', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ContactUs);
