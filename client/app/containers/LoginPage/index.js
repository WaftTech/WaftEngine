/**
 *
 * LoginPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { FormattedMessage } from "react-intl";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, TextField } from "@material-ui/core";
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";

import logo from "assets/img/logo.svg";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";

import messages from "./messages";
import { loginRequest, resetPasswordRequest } from "./actions";
import { makeSelectIsRequesting, makeSelectErrors } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Button from "../../components/CustomButtons/Button";
import LanguageSwitcher from "../../components/LanguageSwitcher";

class LoginPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: this.props.match.params.email || ""
      },
      errors: {},
      redirectToReferrer: this.props.location.state
        ? this.props.location.state.from.pathname
        : false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      const errors = nextProps.errors.toJS();
      this.setState({ errors });
    }
  }
  /* for other Input fields */
  handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    this.setState(state => ({
      data: {
        ...state.data,
        [name]: value
      }
    }));
  };
  validate = () => {
    const errors = {};
    // const { data } = this.state;
    // if (!data.email) errors.email = "Can't be empty";
    // if (!data.password) errors.password = "Can't be empty";
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { data, redirectToReferrer } = this.state;
      this.props.login(data, redirectToReferrer);
    }
  };
  resetPassword = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.email) errors.email = "Can't be empty";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.resetPassword({ email: data.email });
    }
  };
  render() {
    const { data, errors } = this.state;
    const { isRequesting } = this.props;
    return (
      <div className="bgLogin">
        <div
          className="flex-center"
          style={{ maxWidth: "50%", height: "100vh" }}
        >
          <img style={{ width: "200px" }} src={logo} />
        </div>

        <div className="formWrapper flex-center">
          <div className="flex1 text-center">
            <AccountCircle fontSize="large" />
            <Typography component="h2" variant="display1" gutterBottom>
              <FormattedMessage {...messages.header} />
            </Typography>
            <FormattedMessage {...messages.welcomeMessage}>
              {txt => <p>{txt}</p>}
            </FormattedMessage>
            <br />
            <form
              className="hasinput400"
              onSubmit={this.handleSubmit}
              style={{ display: "inline-block" }}
            >
              <div className={errors.email ? "error" : ""}>
                <Grid container spacing={16} alignItems="flex-end">
                  <Grid item>
                    <EmailOutlined />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label={<FormattedMessage {...messages.emailId} />}
                      type="email"
                      name="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                      value={data.email || ""}
                      autoComplete="username"
                    />
                  </Grid>
                </Grid>

                {!!errors.email && <span>{errors.email}</span>}
              </div>
              <div className={errors.password ? "error" : ""}>
                <Grid container spacing={16} alignItems="flex-end">
                  <Grid item>
                    <LockOutlined />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label={<FormattedMessage {...messages.password} />}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={data.password || ""}
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                {!!errors.password && <span>{errors.password}</span>}
              </div>
              <br />
              <div className="text-right">
                <Button
                  className="btn-block"
                  color="primary"
                  type="submit"
                  disabled={isRequesting}
                >
                  {isRequesting ? (
                    <FormattedMessage {...messages.loading} />
                  ) : (
                    <FormattedMessage {...messages.signIn} />
                  )}
                </Button>
              </div>
              <a
                className="color-link"
                onClick={isRequesting ? () => null : () => this.resetPassword()}
              >
                {isRequesting ? (
                  <FormattedMessage {...messages.loading} />
                ) : (
                  <FormattedMessage {...messages.resetPassword} />
                )}
              </a>
            </form>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    toJS: PropTypes.func.isRequired
  }).isRequired
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  Input: {
    margin: theme.spacing.unit
  }
});

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  errors: makeSelectErrors()
});

const mapDispatchToProps = dispatch => ({
  login: (data, redirect) => dispatch(loginRequest(data, redirect)),
  resetPassword: data => dispatch(resetPasswordRequest(data))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "loginPage", reducer });
const withSaga = injectSaga({ key: "loginPage", saga });
const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(LoginPage);
