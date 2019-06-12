import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Helmet from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import BackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectAccess, makeSelectLoading } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

class AccessManagePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAccessRequest: PropTypes.func.isRequired,
    updateAccessRequest: PropTypes.func.isRequired,
    setAccessValue: PropTypes.func.isRequired,
    access: PropTypes.shape({
      Access: PropTypes.array.isRequired,
      Module: PropTypes.object.isRequired,
      Roles: PropTypes.array.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadAccessRequest(this.props.match.params.id);
  }

  handleSave = () => {
    this.props.updateAccessRequest(this.props.match.params.id);
  };

  handleBack = () => {
    this.props.push('/admin/module-manage');
  };

  handleAccessUpdate = (module_id, roleId, ModuleId) => {
    let tempAccess = [...this.props.access.Access];
    const index = tempAccess.findIndex(
      each => each.module_id === ModuleId && each.role_id === roleId,
    );
    if (index > -1) {
      tempAccess[index].access_type = [...module_id];
    } else {
      tempAccess = [
        ...tempAccess,
        { access_type: [...module_id], module_id: ModuleId, role_id: roleId },
      ];
    }
    this.props.setAccessValue({
      key: 'Access',
      value: tempAccess,
    });
  };

  render() {
    const {
      classes,
      access: { Roles, Module, Access },
      loading,
    } = this.props;
    return loading && loading == true ? (
      <CircularProgress color="primary" disableShrink />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>Access Listing</title>
        </Helmet>
        <PageHeader className="text-sm">
          <BackIcon onClick={this.handleBack} />
          {`Edit Access for ${Module.module_name}`}
        </PageHeader>
        <PageContent>
          {Roles.map(role => {
            const accessFiltered = Access.filter(
              each => each.role_id === role._id,
            );
            let accesses = [];
            if (accessFiltered.length > 0) {
              accesses = [...accessFiltered[0].access_type];
            }
            return (
              <div className="mb-4" key={role._id}>
                <h3 className="font-normal">{role.role_title}</h3>
                <ToggleButtonGroup
                  value={accesses}
                  onChange={(_, module_id) =>
                    this.handleAccessUpdate(module_id, role._id, Module._id)
                  }
                >
                  {Module.path.map(eachPath => (
                    <ToggleButton
                      key={`${eachPath._id}-${role._id}`}
                      value={eachPath._id}
                    >
                      {eachPath.access_type}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
            );
          })}

          <button
            className="shadow w-12 h-12 rounded-full text-white bg-blue absolute pin-b pin-r mr-10 mb-10"
            onClick={this.handleSave}
          >
            <CheckIcon />
          </button>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManage', saga });

const mapStateToProps = createStructuredSelector({
  access: makeSelectAccess(),
  loading: makeSelectLoading(),
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
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AccessManagePage);
