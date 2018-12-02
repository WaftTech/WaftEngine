import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import { loadOneRequest, addEditRequest } from '../actions';
import PathComponent from './components/Path';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class AddEdit extends Component {
  state = { ModuleName: '', Path: [] };
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState({ [name]: newContent });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleAddPath = () => event => {
    event.persist();

    this.setState(state => ({
      Path: [...state.Path, { AccessType: '', AdminRoutes: [], ServerRoutes: [] }],
    }));
  };
  handleRemovePath = index => event => {
    event.persist();

    this.setState(state => ({
      Path: [...state.Path.slice(0, index), ...state.Path.slice(index + 1)],
    }));
  };
  handleAccessTypeChange = id => event => {
    event.persist();

    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            const newPath = { ...eachPath, AccessType: event.target.value };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleAdminRoutesChange = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { AdminRoutes } = eachPath;
            AdminRoutes[index] = event.target.value;
            const newPath = { ...eachPath, AdminRoutes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleRemoveAdminRoute = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { AdminRoutes } = eachPath;
            const newPath = {
              ...eachPath,
              AdminRoutes: [...AdminRoutes.slice(0, index), ...AdminRoutes.slice(index + 1)],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };

  handleAddAdminRoute = id => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { AdminRoutes } = eachPath;
            const newPath = { ...eachPath, AdminRoutes: [...AdminRoutes, ''] };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleServerRoutesMethodChange = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            ServerRoutes[index].method = event.target.value;
            const newPath = { ...eachPath, ServerRoutes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleServerRoutesRouteChange = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            ServerRoutes[index].route = event.target.value;
            const newPath = { ...eachPath, ServerRoutes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleAddServerRoute = id => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            const newPath = {
              ...eachPath,
              ServerRoutes: [...ServerRoutes, { route: '', method: '' }],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleRemoveServerRoute = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            const newPath = {
              ...eachPath,
              ServerRoutes: [...ServerRoutes.slice(0, index), ...ServerRoutes.slice(index + 1)],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };
  handleGoBack = () => {
    this.props.history.push('/wt/module-manage');
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      this.setState(state => ({
        ...oneObj,
      }));
    }
  }
  render() {
    const { classes } = this.props;
    const { ModuleName, Path } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit Module</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Module Name"
                      id="module-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: ModuleName,
                        onChange: this.handleChange('ModuleName'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                {Path.map((each, pathIndex) => (
                  <PathComponent
                    key={`${each._id}-${pathIndex}`}
                    each={each}
                    pathIndex={pathIndex}
                    handleAccessTypeChange={this.handleAccessTypeChange}
                    handleAdminRoutesChange={this.handleAdminRoutesChange}
                    handleRemoveAdminRoute={this.handleRemoveAdminRoute}
                    handleAddAdminRoute={this.handleAddAdminRoute}
                    handleServerRoutesMethodChange={this.handleServerRoutesMethodChange}
                    handleServerRoutesRouteChange={this.handleServerRoutesRouteChange}
                    handleRemoveServerRoute={this.handleRemoveServerRoute}
                    handleAddServerRoute={this.handleAddServerRoute}
                    handleRemovePath={this.handleRemovePath}
                  />
                ))}
                <Card>
                  <CardBody className="text-center">
                    <IconButton
                      className="btn-circle-add"
                      color="primary"
                      aria-label="Add"
                      onClick={this.handleAddPath()}
                    >
                      <AddIcon fontSize="large" />
                    </IconButton>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            <CardFooter>
              <Button size="lg" onClick={this.handleGoBack}>
                Back
              </Button>

              <Button size="lg" color="primary" onClick={this.handleSave}>
                Save Changes
              </Button>
            </CardFooter>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'moduleManagePage', reducer });
const withSaga = injectSaga({ key: 'moduleManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
