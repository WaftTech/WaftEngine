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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
import './style.css';

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

  const [expanded, setExpanded] = useState('panel1');
  const [first, setFirst] = useState(true);

  const handleFirst = () => {
    setFirst(!first);
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
             <ExpansionPanel
            expanded={first}
            onChange={handleFirst}
            className={classes.ExpansionPanelMainWrapper}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              classes={{
                root: classes.productRoot,
                content: classes.productContent,
                expandIcon: classes.productExpandIcon,
                expanded: classes.productExpanded,
              }}>
              <Typography className={classes.heading}><h4 className="font-medium">{each.module_group} Group</h4></Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{display:'block'}}>
              {each.modules.map(module => (
                <fieldset className="formfieldset mb-2">
                  <legend
                  className="text-lg px-2"
                    onClick={() => getAccessArray(module._id)}
                  >
                    {module.module_name}
                  </legend>
                  <ul className="flex flex-wrap">
                    {module.path.length > 0 &&
                      module.path.map(module_path => (
                        <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-2">
                          <div className="mr-2">
                          <FormControlLabel style={{margin: '0'}}
                            className="w-full px-2 py-1 bg-gray-100 rounded"
                            control={
                              <Checkbox
                                color="primary"
                                name={module_path._id}
                                checked={getAccessArray(module._id).includes(
                                  module_path._id,
                                )}
                                onChange={handleAccessChange(module._id)}
                              />
                            }
                            label={module_path.access_type}
                          />
                          </div>
                        </li>
                      ))}
                  </ul>
                  </fieldset>
              ))}
           </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        <button
          className="block btn bg-primary hover:bg-secondary mt-4"
          onClick={handleSave}
        >
          Save
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
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },

  ExpansionPanelMainWrapper: {
    marginBottom: '8px',
    boxShadow: 'none',
  },

  productRoot: {
    minHeight: '44px',
  },

  productContent: {
    margin: '6px 0px',
  },

  productExpandIcon: {
    padding: '0px 12px',
  },

  // productRoot : {
  // 	'& > div' : {
  // 		'&$expanded': {
  // 			minHeight: '44px',
  // 		  },
  // 	},

  // },

  productExpanded: {
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
