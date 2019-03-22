/* eslint-disable no-underscore-dangle */
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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PathComponent from './components/Path';

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
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleChecked = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleAddPath = () => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path,
        { access_type: '', admin_routes: [], server_routes: [] },
      ],
    });
  };

  handleRemovePath = index => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.slice(0, index),
        ...this.props.one.path.slice(index + 1),
      ],
    });
  };

  handleAccessTypeChange = id => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const newPath = { ...eachPath, access_type: event.target.value };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleAdminRoutesChange = (id, index) => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const { admin_routes } = eachPath;
            admin_routes[index] = event.target.value;
            const newPath = { ...eachPath, admin_routes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleRemoveAdminRoute = (id, index) => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const { admin_routes } = eachPath;
            const newPath = {
              ...eachPath,
              admin_routes: [
                ...admin_routes.slice(0, index),
                ...admin_routes.slice(index + 1),
              ],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleAddAdminRoute = id => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const { admin_routes } = eachPath;
            const newPath = {
              ...eachPath,
              admin_routes: [...admin_routes, ''],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleServerRoutesMethodChange = (id, index) => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const { server_routes } = eachPath;
            server_routes[index].method = event.target.value;
            const newPath = { ...eachPath, server_routes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleServerRoutesRouteChange = (id, index) => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const { server_routes } = eachPath;
            server_routes[index].route = event.target.value;
            const newPath = { ...eachPath, server_routes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleRemoveServerRoute = (id, index) => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.map(eachPath => {
          if (eachPath._id === id) {
            const { server_routes } = eachPath;
            const newPath = {
              ...eachPath,
              server_routes: [
                ...server_routes.slice(0, index),
                ...server_routes.slice(index + 1),
              ],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    });
  };

  handleAddServerRoute = index => event => {
    event.persist();
    const { path } = this.props.one;
    path[index] = {
      ...path[index],
      server_routes: [...path[index].server_routes, { route: '', method: '' }],
    };
    this.props.setOneValue({
      key: 'path',
      value: path,
    });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleBack = () => {
    this.props.push('/admin/module-manage');
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      one,
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          {id ? 'Edit' : 'Add'} Module
        </Typography>

        <Typography variant="h6" gutterBottom>
          Form Details
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="module_name"
              label="Module Name"
              value={one.module_name}
              onChange={this.handleChange('module_name')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              label="Descrition"
              value={one.description}
              onChange={this.handleChange('description')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {one.path.map((each, pathIndex) => (
              <PathComponent
                key={`${each._id}-${pathIndex}`}
                each={each}
                pathIndex={pathIndex}
                handleAccessTypeChange={this.handleAccessTypeChange}
                handleAdminRoutesChange={this.handleAdminRoutesChange}
                handleRemoveAdminRoute={this.handleRemoveAdminRoute}
                handleAddAdminRoute={this.handleAddAdminRoute}
                handleServerRoutesMethodChange={
                  this.handleServerRoutesMethodChange
                }
                handleServerRoutesRouteChange={
                  this.handleServerRoutesRouteChange
                }
                handleRemoveServerRoute={this.handleRemoveServerRoute}
                handleAddServerRoute={this.handleAddServerRoute}
                handleRemovePath={this.handleRemovePath}
              />
            ))}
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button onClick={this.handleBack} className={classes.button}>
            Back
          </Button>
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
    );
  }
}

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManageAddEdit', saga });

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
