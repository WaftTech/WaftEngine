import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectAccess, makeSelectLoading } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import '../style.css';
import { FaPencilAlt, FaArrowLeft, FaSearch, FaPlus } from 'react-icons/fa';

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
  handleEditAccess = () => {
    this.props.clearOne();
    this.props.push(`/admin/module-manage/edit/${this.props.match.params.id}`);
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

        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {`Edit Access for ${Module.module_name}`}
          </PageHeader>

          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleEditAccess}
            >
              <FaPlus />
              <span className="pl-2">Add New</span>
            </button>
          </div>
        </div>
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
              <div className="mb-4 border rounded mt-6 p-2" key={role._id}>
                <h3
                  className="font-bold bg-white px-2 relative text-lg ml-2 inline-block"
                  style={{ top: -21 }}
                >
                  {role.role_title}
                </h3>
                <div
                  value={accesses}
                  onChange={(_, module_id) =>
                    this.handleAccessUpdate(module_id, role._id, Module._id)
                  }
                >
                  {Module.path.map(eachPath => (
                    <div
                      className="bg-white text-sm px-2 py-1 inline-flex mr-2 mb-2 rounded border lowercase cursor-pointer hover:bg-blue-100 hover:border-blue-200 hover:text-blue-500"
                      key={`${eachPath._id}-${role._id}`}
                      value={eachPath._id}
                    >
                      {eachPath.access_type}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <button
            className="block btn bg-blue-500 border border-blue-600 hover:bg-blue-600"
            onClick={this.handleSave}
          >
            Save Changes
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
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  toggleContainer: {
    height: 56,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing(1)}px 0`,
    background: theme.palette.background.default,
  },

  accesslist: {
    boxShadow: 'none',
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AccessManagePage);
