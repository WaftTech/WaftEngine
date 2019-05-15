import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// core components
import { TextField } from '@material-ui/core';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import PageContent from '../../../components/PageContent/PageContent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
    boxShadow: 'none',
    background: 'rgba(0,0,0,.2)',
    '&:hover': {
      background: '#204E07',
      color: '#fff',
    },
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
export class ChangePassword extends React.Component {
  static propTypes = {
    changePasswordRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    errors: {},
    showPassword: false,
  };

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    const errors = {};
    const { oldPassword, newPassword, newPassword2 } = this.state;
    if (!oldPassword) errors.oldPassword = "Can't be empty";
    if (!newPassword) errors.newPassword = "Can't be empty";
    if (!newPassword2) errors.newPassword2 = "Can't be empty";
    return { errors, isValid: !Object.keys(errors).length };
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { errors, isValid } = this.validate();
  //   this.setState({ errors });
  //   // const { oldPassword, newPassword, newPassword2 } = this.state;
  //   // this.props.changePasswordRequest({ oldPassword, newPassword, newPassword2 });
  //   if (isValid) {
  //     const { oldPassword, newPassword, newPassword2 } = this.state;
  //     this.props.changePasswordRequest({ oldPassword, newPassword, newPassword2 });
  //   }
  // };

  handleSave = e => {
    e.preventDefault();
    const { errors, isValid } = this.validate();
    this.setState({ errors });
    if (isValid) {
      const { oldPassword, newPassword, newPassword2 } = this.state;
      this.props.changePasswordRequest({
        oldPassword,
        newPassword,
        newPassword2,
      });
    }
  };

  render() {
    const {
      oldPassword,
      newPassword,
      newPassword2,
      showPassword,
      errors,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <PageContent>
          <Paper className={classes.paper}>
            <div>
              <h3> Change Password </h3>
            </div>
            <br />
            <div>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <label htmlFor="oldPassword" />
                  <TextField
                    fullWidth
                    id="oldPassword"
                    name="oldPassword"
                    className="form-control"
                    placeholder="Confirm Current Password"
                    value={oldPassword}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleChange}
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.oldPassword && <span>{errors.oldPassword}</span>}
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="newPassword"
                    name="newPassword"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={this.handleChange}
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.newPassword && <span>{errors.newPassword}</span>}
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="newPassword2"
                    name="newPassword2"
                    className="form-control"
                    placeholder={
                      errors.newPassword2
                        ? errors.newPassword2
                        : 'Confirm New Password'
                    }
                    value={newPassword2}
                    onChange={this.handleChange}
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.newPassword2 && <span>{errors.newPassword2}</span>}
                </Grid>
                <br />
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.handleSave}
                    className={classes.button}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </div>
          </Paper>
        </PageContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'changePassword', reducer });
const withSaga = injectSaga({ key: 'changePassword', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ChangePassword);
