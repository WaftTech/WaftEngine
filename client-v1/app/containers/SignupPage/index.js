/**
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Card from 'components/Card';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core';
import Footer from 'components/Footer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import UsernameInput from './components/UsernameInput';
import EmailInput from './components/EmailInput';
import styles from './styles';

class SignupPage extends React.PureComponent {
  state = { cardAnimaton: 'cardHidden' };

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ cardAnimaton: '' }), 700);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes[this.state.cardAnimaton]}>
          <form>
            <UsernameInput />
            <EmailInput />
            <button type="submit">Submit</button>
          </form>
        </Card>
        <Footer whiteFont />
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
const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SignupPage);
