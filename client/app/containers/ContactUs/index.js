import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
// import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import saga from './saga';
import reducer from './reducer';
import { makeSelectIsRequesting, makeSelectSuccess, makeSelectMsg, makeSelectErrorMsg, makeSelectContactDetail } from './selectors';
import { saveContactRequest, contactDetailRequest } from './actions';

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
  state = { name: '', email: '', subject: '', message: '' };
  componentDidMount() {
    this.props.loadContactDetail();
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
    this.props.save(this.state);
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
    const { isRequesting, msg, contactDetail } = this.props;
    const contactDetailObj = contactDetail.toJS();
    const { name, email, subject, message } = this.state;

    return (
      <div className="container">
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <div>
          <h1> Contact Us </h1>
        </div>
        <div>
          <GridContainer>
            <GridItem xs={6} sm={6} md={6}>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{ value: name, onChange: this.handleChange('name') }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{ value: email, onChange: this.handleChange('email') }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Subject"
                        id="subject"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{ value: subject, onChange: this.handleChange('subject') }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Message"
                        id="message"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{ value: message, onChange: this.handleChange('message') }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <form onSubmit={this.onSubmit}>
                        <ReCAPTCHA ref={recaptchaRef} sitekey="6LftqoQUAAAAAOnGULHOWhdUACVQYeHFggJdRojU" onChange={this.onChange} />
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" disabled={isRequesting} onClick={this.handleSave}>
                    Save Message
                  </Button>

                  <div>
                    <h1>{msg}</h1>
                  </div>
                  <div>
                    <h1>{this.props.error}</h1>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
              {contactDetailObj.Description && <div dangerouslySetInnerHTML={{ __html: contactDetailObj.Description }} />}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

ContactUs.propTypes = {
  save: PropTypes.func.isRequired,
  contactDetail: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  success: makeSelectSuccess(),
  msg: makeSelectMsg(),
  error: makeSelectErrorMsg(),
  contactDetail: makeSelectContactDetail(),
});

const mapDispatchToProps = dispatch => ({
  save: payload => dispatch(saveContactRequest(payload)),
  loadContactDetail: () => dispatch(contactDetailRequest()),
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
