/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from './reducer';
import saga from './saga';
import { makeSelectOne, makeSelectErrors } from './selectors';
import * as mapDispatchToProps from './actions';
import PageContent from '../../../components/PageContent/PageContent';

class UserPersonalInformationPage extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    errors: PropTypes.object,
  };

  componentDidMount() {
    this.props.loadOneRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleDateChange = name => date => {
    this.props.setOneValue({
      key: name,
      value: moment(date).format('YYYY-MM-DD'),
    });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, errors } = this.props;
    return (
      <React.Fragment>
        <PageContent>
          <Paper className={classes.paper}>
            <div>
              <b> Personal Information </b>
            </div>
            <br />
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  error={errors && errors.name && errors.name.length > 0}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    id="name"
                    value={one.name || ''}
                    onChange={this.handleChange('name')}
                  />
                  <FormHelperText id="component-error-text">
                    {errors.name}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  error={errors && errors.email && errors.email.length > 0}
                >
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    id="email"
                    value={one.email || ''}
                  />
                  <FormHelperText id="component-error-text">
                    {errors.email}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid item xs={12} sm={6}>
              <label>Date Of Birth: </label>
              <DatePicker
                margin="normal"
                fullWidth
                name="date_of_birth"
                className={classes.textField}
                value={
                  (one.date_of_birth &&
                    moment(one.date_of_birth).format('YYYY-MM-DD')) ||
                  ''
                }
                onChange={this.handleDateChange('date_of_birth')}
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <CheckBox
                    checked={one.email_verified || false}
                    color="primary"
                  />
                }
                label="Email Verified"
              />
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <div>Roles: {one.roles.map(each => `${each.role_title} `)}</div>
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <div>Added Date: {moment(one.added_at).format('YYYY-MM-DD')}</div>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </Paper>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({
  key: 'userPersonalInformationPage',
  reducer,
});
const withSaga = injectSaga({ key: 'userPersonalInformationPage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(UserPersonalInformationPage);
