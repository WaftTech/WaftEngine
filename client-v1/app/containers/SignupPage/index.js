/**
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import image from 'assets/img/signup.jpg';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import UsernameInput from './components/UsernameInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import ConfirmPasswordInput from './components/ConfirmPasswordInput';
import GenderInput from './components/GenderInput';
import SignupStyles from './styles';

class SignupPage extends React.PureComponent {
  constructor(props) {
    super(props);

    // we use this to make the card to appear after the page has been rendered
    this.state = { cardAnimaton: 'cardHidden' };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ cardAnimaton: '' }), 700);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.CardHeader}>
                      <h3>Signup</h3>
                    </CardHeader>
                    <CardBody>
                      <UsernameInput classes={classes} />
                      <EmailInput classes={classes} />
                      <PasswordInput />
                      <ConfirmPasswordInput />
                      <GenderInput classes={classes} />
                    </CardBody>
                    <CardFooter className={classes.CardFooter}>
                      <Button simple color="primary" size="lg">
                        Signup
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupPage', reducer });
const withSaga = injectSaga({ key: 'signupPage', saga });
const withStyle = withStyles(SignupStyles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SignupPage);
