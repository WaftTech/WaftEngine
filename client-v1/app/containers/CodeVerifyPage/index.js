/**
 *
 * CodeVerifyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import EmailInput from './components/EmailInput';
import CodeInput from './components/CodeInput';
import PasswordInput from './components/PasswordInput';
import reducer from './reducer';
import * as mapDispatchToProps from './actions';
import saga from './saga';
import style from './styles';

/* eslint-disable react/prefer-stateless-function */
class CodeVerifyPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: 'cardHidden',
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ cardAnimaton: '' }), 500);
  }

  handleSubmit() {
    this.props.submitRequest();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div>
          <h3>Verify the code from your email and reset your password!!</h3>
        </div>
        <GridContainer justify="flex-start">
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes[this.state.cardAnimaton]}>
              <form className={classes.form}>
                <CardBody>
                  <EmailInput />
                  <CodeInput />
                  <PasswordInput />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg" onClick={this.handleSubmit}>
                    submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = null;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'codeVerifyPage', reducer });
const withSaga = injectSaga({ key: 'codeVerifyPage', saga });
const withStyle = withStyles(style);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(CodeVerifyPage);
