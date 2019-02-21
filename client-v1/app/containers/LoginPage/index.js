/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import Footer from 'components/Footer';
import Card from 'components/Card';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import styles from './styles';

class LoginPage extends React.PureComponent {
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
            <PasswordInput />
            <button type="submit">Submit</button>
          </form>
        </Card>
        <Footer whiteFont />
      </>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
