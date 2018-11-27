import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  handleAccessTypeChange = id => event => {
    this.setState(state => ({
      ...state,
      Path: [
        ...state.Path,
        { ...state.Path.filter(each => each._id === id)[0], AccessType: event.target.value },
      ],
    }));
  };
  handleAdminRoutesChange = (id, index) => event => {
    this.setState(state => ({
      ...state,
      Path: [
        ...state.Path,
        { ...state.Path.filter(each => each._id === id)[0], AccessType: event.target.value },
      ],
    }));
  };
  handleServerRoutesMethodChange = (id, index) => event => {
    this.setState(state => ({
      ...state,
      Path: [
        ...state.Path,
        { ...state.Path.filter(each => each._id === id)[0], AccessType: event.target.value },
      ],
    }));
  };
  handleServerRoutesRouteChange = (id, index) => event => {
    this.setState(state => ({
      ...state,
      Path: [
        ...state.Path,
        { ...state.Path.filter(each => each._id === id)[0], AccessType: event.target.value },
      ],
    }));
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
    console.log(Path);
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
                      inputProps={{ value: ModuleName, onChange: this.handleChange('ModuleName') }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {Path.map(each => (
                      <Card key={each._id}>
                        <GridContainer>
                          <GridItem xs={3} sm={3} md={3}>
                            <h6>
                              <CustomInput
                                labelText="Access Type"
                                id={`${each._id}-access-type`}
                                formControlProps={{
                                  fullWidth: false,
                                }}
                                inputProps={{
                                  value: each.AccessType,
                                  onChange: this.handleAccessTypeChange(each._id),
                                }}
                              />
                            </h6>
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <div>Client Routes:</div>
                            <ul>
                              {each.AdminRoutes.map((eachAdminRoute, index) => (
                                <li key={`${each._id}-each-admin-route-${index}`}>
                                  <CustomInput
                                    labelText="Client Routes"
                                    id={`${each._id}-each-admin-route-access-type-${index}`}
                                    formControlProps={{
                                      fullWidth: false,
                                    }}
                                    inputProps={{
                                      value: eachAdminRoute,
                                      onChange: this.handleAdminRoutesChange(each._id, index),
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <div>Server Routes:</div>
                            <ul>
                              {each.ServerRoutes.map((eachServerRoute, index) => (
                                <li
                                  key={`${each._id}-${
                                    eachServerRoute._id
                                  }-each-server-route-${index}`}
                                >
                                  <CustomInput
                                    labelText="Method"
                                    id={`${each._id}-${
                                      eachServerRoute._id
                                    }-each-admin-server-route-method-access-type-${index}`}
                                    formControlProps={{
                                      fullWidth: false,
                                    }}
                                    inputProps={{
                                      value: eachServerRoute.method,
                                      onChange: this.handleServerRoutesMethodChange(
                                        each._id,
                                        index,
                                      ),
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Route"
                                    id={`${each._id}-${
                                      eachServerRoute._id
                                    }-each-admin-server-route-route-access-type-${index}`}
                                    formControlProps={{
                                      fullWidth: false,
                                    }}
                                    inputProps={{
                                      value: eachServerRoute.route,
                                      onChange: this.handleServerRoutesRouteChange(each._id, index),
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          </GridItem>
                        </GridContainer>
                      </Card>
                    ))}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Save</Button>
                <Button color="primary" onClick={this.handleGoBack}>
                  Back
                </Button>
              </CardFooter>
            </Card>
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
