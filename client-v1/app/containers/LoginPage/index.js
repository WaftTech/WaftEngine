import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import image from 'assets/img/bg7.jpg';
import loginPageStyle from './styles';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';

import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

class LoginPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loginRequest: PropTypes.func.isRequired,
  };

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
    this.props.loginRequest();
  };

  render() {
    const { classes } = this.props;
    return (
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
                  <CardBody>
                    <UsernameInput classes={classes} />
                    <PasswordInput classes={classes} />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={this.handleSubmit}>
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });
const withStyle = withStyles(loginPageStyle);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
