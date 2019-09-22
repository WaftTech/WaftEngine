import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import Grid from '@material-ui/core/Grid';
import CustomInput from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardBody from '@material-ui/core/CardContent';
import CardFooter from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    this.props.ContactDetailRequest();
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

    return isRequesting && isRequesting == true ? (
      <CircularProgress color="primary" disableShrink />
    ) : (
        <div className="container">
          <Helmet>
            <title>Contact Us</title>
          </Helmet>
          <div>
            <h1 className="text-4xl font-bold"> Contact Us </h1>
          </div>
          <div>
            <Grid container>
              <Grid item xs={6} sm={6} md={6}>
                <Card>
                  <CardBody>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CustomInput
                          name="Name"
                          id="name"
                          fullWidth
                          placeholder="Name"
                          inputProps={{
                            value: name || '',
                            onChange: this.handleChange('name'),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CustomInput
                          name="Email"
                          id="email"
                          fullWidth
                          placeholder="Email"
                          inputProps={{
                            value: email || '',
                            onChange: this.handleChange('email'),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CustomInput
                          name="Subject"
                          id="subject"
                          fullWidth
                          placeholder="Subject"
                          inputProps={{
                            value: subject || '',
                            onChange: this.handleChange('subject'),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <CustomInput
                          name="Message"
                          id="message"
                          fullWidth
                          placeholder="Message"
                          inputProps={{
                            value: message || '',
                            onChange: this.handleChange('message'),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <form onSubmit={this.onSubmit}>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={this.onChange}
                          />
                        </form>
                      </Grid>
                    </Grid>
                  </CardBody>
                  <CardFooter>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSave}
                    >
                      Save Message
                  </Button>
                    <div>
                      <h1>{this.props.error}</h1>
                    </div>
                  </CardFooter>
                </Card>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                {contactDetail.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contactDetail.description,
                    }}
                  />
                )}
              </Grid>
            </Grid>
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
