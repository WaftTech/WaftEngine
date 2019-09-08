import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectRoles,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Loading from '../../../../components/Loading';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = {
    isSecure: false,
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadAllRolesRequest();
  }

  handleChange = name => event => {
    event.persist();
    const tempUser = { ...this.props.one.users };
    tempUser[name] = event.target.value;
    this.props.setOneValue({ key: 'users', value: tempUser });
  };

  handleChecked = name => event => {
    event.persist();
    const tempUser = { ...this.props.one.users };
    tempUser[name] = event.target.checked;
    this.props.setOneValue({ key: 'users', value: tempUser });
  };

  handleRolesChecked = roleid => {
    const tempUser = { ...this.props.one.users };
    if (tempUser.roles.includes(roleid)) {
      const index = tempUser.roles.indexOf(roleid);
      tempUser.roles = [
        ...tempUser.roles.slice(0, index),
        ...tempUser.roles.slice(index + 1),
      ];
    } else {
      tempUser.roles = [...tempUser.roles, roleid];
    }
    this.props.setOneValue({ key: 'users', value: tempUser });
  };

  handleTogglePassword = () => {
    this.setState({ isSecure: !this.state.isSecure });
  };

  handleSave = () => {
    this.props.addEditRequest(this.props.history.goBack);
  };

  handleUpdate = () => {
    this.props.updatePasswordRequest();
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      one: { users, rolesNormalized, roles },
      roless,
      loading,
      errors,
    } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
        <>
          <Helmet>
            <title>{id ? 'Edit User' : 'Add User'}</title>
          </Helmet>

          <div className="flex justify-between mt-3 mb-3">
            <PageHeader>
              <IconButton
                className={`${classes.backbtn} cursor-pointer`}
                onClick={this.handleBack}
                aria-label="Back"
              >
                <BackIcon />
              </IconButton>
              {id ? 'Edit' : 'Add'} User
          </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <h2 className="font-bold text-4xl">Basic Information</h2>
              <br />
              <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                Email
            </label>
              <input
                className="Waftinputbox"
                readOnly={id ? true : false}
                id="email"
                type="text"
                value={users.email || ''}
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                Name
            </label>

              <input
                className="Waftinputbox"
                id="name"
                type="text"
                value={users.name || ''}
                onChange={this.handleChange('name')}
              />
              <div id="component-error-text">{(errors && errors.name) || ''}</div>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                Bio
            </label>

              <textarea
                className="Waftinputbox"
                id="bio"
                type="text"
                value={(users && users.bio) || ''}
                onChange={this.handleChange('bio')}
              />
            </div>
            {roless.map(each => (
              <FormControlLabel
                key={each._id}
                control={
                  <Checkbox
                    key={each}
                    color="secondary"
                    checked={users.roles.includes(each._id)}
                    onChange={() => this.handleRolesChecked(each._id)}
                  />
                }
                label={each.role_title || ''}
              />
            ))}
            <div id="component-error-text">{(errors && errors.roles) || ''}</div>

            <br />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  disabled
                  name="email_verified"
                  checked={users.email_verified || false}
                  onChange={this.handleChecked('email_verified')}
                />
              }
              label="Email Verified"
            />
            <br />
            {id ? (
              <button
                className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
                onClick={this.handleSave}
              >
                Save
            </button>
            ) : (
                <></>
              )}
            <br />
            <br />
            <h3 className="text-2xl font-bold">Reset Password</h3>
            <br />
            <div className="w-full md:w-1/2 pb-4">
              <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                Password
            </label>
              <div className="relative">
                <input
                  className="Waftinputbox"
                  id="password"
                  type={this.state.isSecure ? 'password' : 'text'}
                  value={users.password || ''}
                  onChange={this.handleChange('password')}
                />
                <span
                  className={classes.EyeIcon}
                  aria-label="Toggle password visibility"
                  onClick={this.handleTogglePassword}
                >
                  {this.state.isSecure ? <Visibility /> : <VisibilityOff />}
                </span>
              </div>
              <div id="component-error-text">{errors.password || ''}</div>
            </div>
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={this.handleUpdate}
            >
              {id ? 'Update Password' : 'Set Password'}
            </button>
          </PageContent>
        </>
      );
  }
}

const withReducer = injectReducer({ key: 'adminUserManagePage', reducer });
const withSaga = injectSaga({ key: 'adminUserManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  roless: makeSelectRoles(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
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

  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
  EyeIcon: { position: 'absolute', right: 12, top: 6 },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
