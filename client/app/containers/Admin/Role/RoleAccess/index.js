import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectModuleData,
  makeSelectLoaders,
  makeSelectErrors,
  makeSelectRoleData,
} from '../selectors';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import '../../../../components/Table/table.css';
import './style.css';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import Panel from '../../../../components/Panel';

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
    setAccessArray,
    saveRoleAccessRequest,
  } = props;

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState('panel1');
  const [first, setFirst] = useState(true);

  const handleFirst = () => {
    setFirst(!first);
  };
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

  useEffect(() => {
    if (module_data && module_data.length > 0) {
      setExpanded(module_data[0]._id);
    }
  }, [module_data]);

  const getAccessArray = module_id => {
    let access_array = [];
    for (let index = 0; index < Access.length; index++) {
      if (Access[index].module_id === module_id) {
        access_array = Access[index].access_type;
      }
    }
    return access_array;
  };

  const handleAccessChange = module_id => event => {
    event.persist();
    let access_array = [];
    let temp_index = 0;
    for (let index = 0; index < Access.length; index++) {
      if (Access[index].module_id === module_id) {
        access_array = Access[index].access_type;
        temp_index = index;
      }
    }
    let tempValue = [...access_array];
    if (event.target.checked) {
      tempValue = [...tempValue, event.target.name];
    } else {
      tempValue = tempValue.filter(each => each !== event.target.name);
    }
    setAccessArray({ index: temp_index, value: tempValue });
  };

  const handleBack = () => {
    push('/admin/role-manage');
  };

  const handleSave = () => {
    saveRoleAccessRequest(match.params.id);
  };

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <React.Fragment>
      <Helmet>
        <title>Role Access</title>
      </Helmet>
      <div className="flex justify-between my-3">
        <PageHeader>
          <span className="backbtn" onClick={handleBack}>
            <FaArrowLeft className="text-xl" />
          </span>
          Role Access
        </PageHeader>
      </div>
      <PageContent>
        {module_data.map((each, index) => (
          <Panel
            title={`${each.module_group} Group`}
            body={each.modules.map(module => (
              <fieldset
                key={`${module._id}-${each._id}-${index}`}
                className="formfieldset mb-2"
              >
                <legend
                  className="text-lg px-2"
                  onClick={() => getAccessArray(module._id)}
                >
                  {module.module_name}
                </legend>
                <ul className="flex flex-wrap">
                  {module.path.length > 0 &&
                    module.path.map(module_path => (
                      <li
                        key={`${module_path._id}-${module._id}-${
                          each._id
                        }-${index}`}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-2"
                      >
                        <div className="mr-2">
                          <div className="checkbox">
                            <input
                              name={module_path._id}
                              checked={getAccessArray(module._id).includes(
                                module_path._id,
                              )}
                              onChange={handleAccessChange(module._id)}
                              id={module_path._id}
                              type="checkbox"
                            />
                            <label htmlFor={module_path._id}>
                              <span className="box">
                                <FaCheck className="check-icon" />
                              </span>
                              {module_path.access_type}
                            </label>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </fieldset>
            ))}
          />
        ))}
        <button
          className="btn bg-blue-500 hover:bg-blue-600 mt-4"
          onClick={handleSave}
        >
          Save Role Access
        </button>
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
  secondaryHeading: {
    color: '#ff3b30',
    textTransform: 'Capitalize',
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  ExpansionPanelMainWrapper: {
    marginBottom: '8px',
    boxShadow: 'none',
  },

  roleRoot: {
    minHeight: '44px',
  },

  roleContent: {
    margin: '6px 0px',
  },

  roleExpandIcon: {
    padding: '0px 12px',
  },

  roleExpanded: {
    borderBottom: '1px solid gainsboro',
    margin: '6px 0px !important',
    '& > div': {
      borderBottom: 'none',
      margin: '6px 0px',
    },
  },

  topography: {
    width: '100%',
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(RoleAccess);
