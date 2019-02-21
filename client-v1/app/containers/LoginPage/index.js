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
import image from 'assets/img/bg7.jpg';

import Footer from 'components/Footer/Footer';
import Card from 'components/Card/Card';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
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
        {/* <Header /> */}

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
                    <UsernameInput />
                    <PasswordInput />
                    <button type="submit">Submit</button>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
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
