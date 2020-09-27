import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectModuleData,
  makeSelectLoaders,
  makeSelectErrors,
  makeSelectRoleData,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/customComponents/Input';
import '../../../../components/Table/table.css';
import { each } from 'lodash';

const RoleAccess = props => {
  const {
    classes,
    module_data,
    match,
    loaders,
    push,
    loadModuleGroupRequest,
    loadRoleAccessRequest,
    role_data: { Access },
  } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadModuleGroupRequest();
    if (match.params.id) {
      loadRoleAccessRequest(match.params.id);
    }
  }, []);

  useEffect(() => {
    if (loaders.module_loading === false && loaders.role_loading === false) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [loaders]);

  const getAccessArray = module_id => {
    let access_array = [];
    for (let index = 0; index < Access.length; index++) {
      if (Access[index].module_id === module_id) {
        access_array = Access[index].access_type;
      }
    }
    console.log(access_array);
    return access_array;
  };

  const handleBack = () => {
    push('/admin/role-manage');
  };

  return loading ? (
    <>
      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>
          <IconButton
            className={`${classes.backbtn} cursor-pointer`}
            onClick={handleBack}
            aria-label="Back"
          >
            <BackIcon />
          </IconButton>
          Role Access
        </PageHeader>
      </div>
      <h2>Loading</h2>
    </>
  ) : (
    <React.Fragment>
      <Helmet>
        <title>Role Access</title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>
          <IconButton
            className={`${classes.backbtn} cursor-pointer`}
            onClick={handleBack}
            aria-label="Back"
          >
            <BackIcon />
          </IconButton>
          Role Access
        </PageHeader>
      </div>
      <PageContent>
        {module_data.map(each => (
          <div className="border-2 border-black p-2 m-2 rounded bg-white">
            <h4>Module Group: {each.module_group}</h4>
            <div className="ml-4 ">
              {each.modules.map(module => (
                <div className="border-2 border-blue-600 mb-2 pb-2 rounded">
                  <span
                    className="text-lg p-2"
                    onClick={() => getAccessArray(module._id)}
                  >
                    Module: {module.module_name}
                  </span>
                  <ul className="ml-4 flex flex-wrap">
                    {module.path.length > 0 &&
                      module.path.map(module_path => (
                        <li>
                          {' '}
                          <FormControlLabel
                            className="flex-1"
                            control={
                              <Checkbox
                                color="primary"
                                name="is_active"
                                checked={getAccessArray(module._id).includes(
                                  module_path._id,
                                )}
                              />
                            }
                            label={module_path.access_type}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </PageContent>
    </React.Fragment>
  );
};

const withReducer = injectReducer({ key: 'adminRole', reducer });
const withSaga = injectSaga({ key: 'adminRole', saga });

const mapStateToProps = createStructuredSelector({
  module_data: makeSelectModuleData(),
  loaders: makeSelectLoaders(),
  errors: makeSelectErrors(),
  role_data: makeSelectRoleData(),
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

  waftsrch: {
    padding: 0,
    position: 'absolute',
    borderLeft: '1px solid #d9e3e9',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(RoleAccess);
