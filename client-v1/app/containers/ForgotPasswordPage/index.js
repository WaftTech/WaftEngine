/**
 *
 * ForgotPasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectEmail } from './selectors';
import reducer from './reducer';
import * as mapDispatchToProps from './actions';
import saga from './saga';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
class ForgotPasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(() => this.setState({ cardAnimaton: '' }), 700);
  }

  handleSubmit = () => {
    this.props.passwordResetRequest();
  };

  render() {
    const { classes, email, setStoreValue } = this.props;
    return (
      <>
        <div>
          <h1>Forgot Your Password?</h1>
          <div>
            <h3>Enter Your Email.</h3>
          </div>
          <GridContainer justify="flex-start">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form className={classes.form}>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      placeholder="Your Email Here"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: email,
                        onChange: e => setStoreValue({ key: 'email', value: e.target.value }),
                        type: 'email',
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </>
    );
  }
}

ForgotPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  passwordResetRequest: PropTypes.func.isRequired,
  setStoreValue: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPasswordPage', reducer });
const withSaga = injectSaga({ key: 'forgotPasswordPage', saga });
const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ForgotPasswordPage);
