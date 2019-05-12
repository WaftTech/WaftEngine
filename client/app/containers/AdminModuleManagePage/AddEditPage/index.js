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
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import BackIcon from '@material-ui/icons/ArrowBack';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PathComponent from './components/Path';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';


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

  handleAddPath = event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path,
        { access_type: '', admin_routes: [], server_routes: [] },
      ],
    });
  };

  handleRemovePath = pathIndex => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.slice(0, pathIndex),
        ...this.props.one.path.slice(pathIndex + 1),
      ],
    });
  };

  handleAccessTypeChange = pathIndex => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].access_type = event.target.value;
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleAdminRoutesChange = (pathIndex, index) => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].admin_routes[index] = event.target.value;
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleRemoveAdminRoute = (pathIndex, index) => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].admin_routes = [
      ...tempPath[pathIndex].admin_routes.slice(0, index),
      ...tempPath[pathIndex].admin_routes.slice(index + 1),
    ];
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleAddAdminRoute = pathIndex => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].admin_routes = [
      ...tempPath[pathIndex].admin_routes,
      '',
    ];
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleServerRoutesMethodChange = (pathIndex, index) => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].server_routes[index].method = event.target.value;
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleServerRoutesRouteChange = (pathIndex, index) => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].server_routes[index].route = event.target.value;
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleAddServerRoute = index => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[index] = {
      ...path[index],
      server_routes: [...path[index].server_routes, { route: '', method: '' }],
    };
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
    });
  };

  handleRemoveServerRoute = (pathIndex, index) => event => {
    event.persist();
    const { path } = this.props.one;
    const tempPath = [...path];
    tempPath[pathIndex].server_routes = [
      ...tempPath[pathIndex].server_routes.slice(0, index),
      ...tempPath[pathIndex].server_routes.slice(index + 1),
    ];
    this.props.setOneValue({
      key: 'path',
      value: tempPath,
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
      <React.Fragment>
        <PageHeader className="text-sm">
          <IconButton
            className="mr-4"
            onClick={this.handleBack}
            aria-label="Back"
          >
            <BackIcon />
          </IconButton>{' '}
          {id ? 'Edit' : 'Add'} Module
        </PageHeader>
        <PageContent>
          <Paper className={classes.paper}>
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
            <Button onClick={this.handleAddPath}>Add Access Type</Button>
            <div className={classes.buttons}>
              <Fab
                color="primary"
                aria-label="Save"
                className={classes.fab}
                onClick={this.handleSave}
              >
                <CheckIcon />
              </Fab>

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

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
