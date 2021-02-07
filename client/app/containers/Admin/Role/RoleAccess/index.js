import { push } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Panel from '../../../../components/Panel';
import '../../../../components/Table/table.css';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoaders,
  makeSelectModuleData,
  makeSelectRoleData,
} from '../selectors';
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

  const handleModuleMultiChoice = (module_id, module_paths) => event => {
    event.persist();
    let access_array = [];
    let temp_index = 0;
    for (let index = 0; index < Access.length; index++) {
      if (Access[index].module_id === module_id) {
        temp_index = index;
      }
    }
    let tempValue = [...access_array];
    if (event.target.checked === true) {
      for (let index = 0; index < module_paths.length; index++) {
        const element = module_paths[index];
        tempValue.push(element._id);
      }
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
            body={each.modules.map((module, moduleIndex) => (
              <fieldset
                key={`${module._id}-${each._id}-${index}`}
                className="formfieldset mb-2"
              >
                <legend
                  className="text-lg px-2"
                  onClick={() => getAccessArray(module._id)}
                >
                  {module.module_name}{' '}
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id={`module-${moduleIndex}`}
                      checked={
                        module.path.length === getAccessArray(module._id).length
                      }
                      onChange={handleModuleMultiChoice(
                        module._id,
                        module.path,
                      )}
                    />{' '}
                    <label htmlFor={`module-${moduleIndex}`}>
                      <span className="box">
                        <FaCheck className="check-icon" />
                      </span>
                    </label>
                  </div>
                </legend>
                <ul className="flex flex-wrap">
                  {module.path.length > 0 &&
                    module.path.map(module_path => (
                      <li
                        key={`${module_path._id}-${module._id}-${each._id}-${index}`}
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
          className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
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

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withReducer, withSaga, withConnect)(RoleAccess);
