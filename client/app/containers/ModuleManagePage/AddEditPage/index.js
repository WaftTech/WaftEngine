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
  handleAccessTypeChange = pathIndex => event => {
    event.persist();

    this.setState(state => {
      let currentPathArr = [...state.Path];
      currentPathArr[pathIndex] = { ...currentPathArr[pathIndex], AccessType: event.target.value };
      return { Path: currentPathArr };
    });
  };
  handleAdminRoutesChange = (index, pathIndex) => event => {
    event.persist();

    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { AdminRoutes } = currentPathArr[pathIndex];
      AdminRoutes[index] = event.target.value;

      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        AdminRoutes,
      };
      return { Path: currentPathArr };
    });
  };
  handleRemoveAdminRoute = (index, pathIndex) => event => {
    event.persist();
    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { AdminRoutes } = currentPathArr[pathIndex];
      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        AdminRoutes: [...AdminRoutes.slice(0, index), ...AdminRoutes.slice(index + 1)],
      };
      return { Path: currentPathArr };
    });
  };

  handleAddAdminRoute = pathIndex => event => {
    event.persist();
    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { AdminRoutes } = currentPathArr[pathIndex];
      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        AdminRoutes: [...AdminRoutes, ''],
      };
      return { Path: currentPathArr };
    });
  };
  handleServerRoutesMethodChange = (index, pathIndex) => event => {
    event.persist();
    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { ServerRoutes } = currentPathArr[pathIndex];
      ServerRoutes[index].method = event.target.value;

      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        ServerRoutes,
      };
      return { Path: currentPathArr };
    });
  };
  handleServerRoutesRouteChange = (index, pathIndex) => event => {
    event.persist();
    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { ServerRoutes } = currentPathArr[pathIndex];
      ServerRoutes[index].route = event.target.value;

      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        ServerRoutes,
      };
      return { Path: currentPathArr };
    });
  };
  handleAddServerRoute = pathIndex => event => {
    event.persist();

    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { ServerRoutes } = currentPathArr[pathIndex];
      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        ServerRoutes: [...ServerRoutes, { route: '', method: '' }],
      };
      return { Path: currentPathArr };
    });
  };
  handleRemoveServerRoute = (index, pathIndex) => event => {
    event.persist();
    this.setState(state => {
      let currentPathArr = [...state.Path];
      let { ServerRoutes } = currentPathArr[pathIndex];
      currentPathArr[pathIndex] = {
        ...currentPathArr[pathIndex],
        ServerRoutes: [...ServerRoutes.slice(0, index), ...ServerRoutes.slice(index + 1)],
      };
      return { Path: currentPathArr };
    });
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };
  handleGoBack = () => {
    this.props.history.push('/wt/module-manage');
  };
  render() {
    const { classes } = this.props;
    const { ModuleName, Path } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              {/* <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit Module</h4>
              </CardHeader> */}
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
                <div className="addCard" onClick={this.handleAddPath()}>
                  <Button>
                    <AddIcon />
                    Add Access Type
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
            <CardFooter>
              <Button onClick={this.handleGoBack}>Back</Button>

              <Button color="primary" onClick={this.handleSave}>
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
const withSaga = injectSaga({ key: 'moduleManagePageAddEdit', saga });

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
