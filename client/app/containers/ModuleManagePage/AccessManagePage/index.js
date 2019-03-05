import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

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
import { makeSelectAccess } from '../selectors';
import { loadAccessRequest, updateAccessRequest } from '../actions';

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

class AccessManagePage extends Component {
  state = { Access: [], Module: [], Roles: [], access_type: [] };

  handleChecked = (id, roleId, moduleId) => event => {
    if (event.target.checked) {
      this.setState(state => {
        const index = state.Access.findIndex(each => each.module_id === moduleId && each.role_id === roleId);
        if (index > -1) {
          state.Access[index].access_type = [...state.Access[index].access_type, id];
          return { Access: state.Access };
        } else {
          return {
            Access: [...state.Access, { access_type: [id], module_id: moduleId, role_id: roleId }],
          };
        }
      });
    } else {
      this.setState(state => {
        const index = state.Access.findIndex(each => each.module_id === moduleId && each.role_id === roleId);
        if (index > -1) {
          state.Access[index].access_type = [...state.Access[index].access_type.filter(eachAT => eachAT !== id)];
          return { Access: state.Access };
        }
      });
    }
  };
  handleSave = () => {
    this.props.updateAccess({
      data: { Access: this.state.Access },
      module_id: this.props.match.params.id,
    });
  };
  handleGoBack = () => {
    this.props.history.push('/wt/module-manage');
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadAccess(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.Access !== nextProps.Access) {
      const accessObj = nextProps.Access.toJS();
      this.setState({
        ...accessObj,
        access_type: accessObj.Access.length > 0 ? accessObj.Access.map(each => each.access_type).reduce((each, next, []) => [...each, ...next]) : [],
      });
    }
  }
  render() {
    const { classes } = this.props;
    const { Module, Roles, Access } = this.state;
    const ModulePathList = ({ roleId }) => {
      return (
        (Module &&
          Module.path &&
          Module.path.map(each => {
            const currentAccess = Access.filter(eachAccess => eachAccess.module_id === Module._id && eachAccess.role_id === roleId);
            let checked = false;
            if (currentAccess.length) {
              checked = currentAccess[0].access_type.includes(each._id);
            }
            return (
              <div key={each._id}>
                <FormControlLabel control={<Checkbox checked={checked} tabIndex={-1} onClick={this.handleChecked(each._id, roleId, Module._id)} color="primary" />} label={each.access_type} />
              </div>
            );
          })) ||
        null
      );
    };

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              {/* <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit Access</h4>
              </CardHeader> */}
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {Roles.map(eachRole => (
                      <Card key={eachRole._id}>
                        <CardHeader color="primary">
                          <h5 className={classes.cardTitleWhite}>{eachRole.role_title}</h5>
                        </CardHeader>
                        <CardBody>
                          <ModulePathList roleId={eachRole._id} />
                        </CardBody>
                      </Card>
                    ))}
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
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
const withSaga = injectSaga({ key: 'moduleManagePageAccessManage', saga });

const mapStateToProps = createStructuredSelector({
  Access: makeSelectAccess(),
});

const mapDispatchToProps = dispatch => ({
  loadAccess: payload => dispatch(loadAccessRequest(payload)),
  updateAccess: payload => dispatch(updateAccessRequest(payload)),
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
)(AccessManagePage);
