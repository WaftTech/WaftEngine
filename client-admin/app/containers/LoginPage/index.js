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
import { withStyles } from "@material-ui/core/styles";
import { Input, Button } from "@material-ui/core";
import styled from "styled-components";

import registerImg from "assets/img/register.jpg";
import logo from "assets/img/logo.svg";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { loginRequest, resetPasswordRequest } from "./actions";
import { makeSelectIsRequesting, makeSelectErrors } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

const FlexSection = styled.section`
  color: #fff;
  border: 0;
  height: 100%;
  margin: 0;
  position: relative;
  min-height: 100vh;
  align-items: center;
  background-size: cover;
  background-position: center center;
  background-image: url(${registerImg});
  display: flex;
`;

const FormWrapper = styled.div`
  width: 350px;
  z-index: 4;
  margin-left: auto;
  padding: 15px;
  margin-right: auto;
  padding-right: 15px;
  background: #fff;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;

const HelpBlock = styled.div`
  color: #000;
`;

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
      <FlexSection>
        <div style={{ flex: "1" }}>
          <div className="text-center pt-5 pb-4">
            <img src={logo} />
          </div>
          <FormWrapper className="col-12 col-md-8 col-lg-6 col-xl-4">
            <form onSubmit={this.handleSubmit}>
              <div className={errors.email ? "error" : ""}>
                <Input
                  fullWidth
                  label="Email ID"
                  type="email"
                  name="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  value={data.email || ""}
                  autoComplete="username"
                />
                {!!errors.email && <HelpBlock>{errors.email}</HelpBlock>}
              </div>
              <div className={errors.password ? "error" : ""}>
                <Input
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={data.password || ""}
                  autoComplete="current-password"
                />
                {!!errors.password && <HelpBlock>{errors.password}</HelpBlock>}
              </div>
              <br />

              <div className="text-right">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isRequesting}
                >
                  {isRequesting ? "loading" : "Login"}
                </Button>
              </div>
              <a
                className="color-link"
                onClick={isRequesting ? () => null : () => this.resetPassword()}
              >
                {isRequesting ? "loading" : "Reset Password"}
              </a>
            </form>
          </FormWrapper>
        </div>
      </FlexSection>
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
