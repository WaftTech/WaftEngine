import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

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
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
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
  }

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleBack = () => {
    this.props.push('/admin/user-manage');
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      one: { users, rolesNormalized, roles},
    } = this.props;
    return (
      <>
        {/* <PageHeader>{id ? 'Edit' : 'Add'} User</PageHeader> */}
        <div class="flex justify-between mt-1 mb-1">
        <PageHeader>
        <IconButton className="cursor-pointer"	 onClick={this.handleBack} aria-label="Back">
          <BackIcon />
        </IconButton></PageHeader>
        </div>
        <PageContent>

        <div class="w-full md:w-1/2 pb-4">
          <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2">
          Email
          </label>
          <input class="Waftinputbox" id="email" type="text" value= {users.email}
                     onChange={this.handleChange('email')} />
        </div>

        <div class="w-full md:w-1/2 pb-4">
          <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2">
          Name
          </label>
          <input class="Waftinputbox" id="name" type="text" value= {users.name}
                      onChange={this.handleChange('name')}/>
        </div>
         
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="email_verified"
                    checked={users.email_verified || false}
                    onChange={this.handleChecked('email_verified')}
                  />
                }
                label="Email Verified"
              />
              {roles.map(each => (
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
                  label={each.role_title}
                />
              ))}
              <br/>

          <button class="text-white py-2 px-4 rounded mt-4 btn-waft" onClick={this.handleSave}>
           Save
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
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
