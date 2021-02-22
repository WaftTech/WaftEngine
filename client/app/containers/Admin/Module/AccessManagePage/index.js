import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectAccess, makeSelectLoading } from '../selectors';
import '../style.css';

class AccessManagePage extends React.PureComponent {
  static propTypes = {
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

  handleAccessUpdate = (module_id, roleId, ModuleId, singlePath) => {
    this.props.setAccessUpdate({
      module_id,
      roleId,
      ModuleId,
      singlePath,
    });
  };

  render() {
    const {
      classes,
      access: { Roles, Module, Access },
      loading,
    } = this.props;
    return loading && loading == true ? (
      <div className="circular_loader waftloader"></div>
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
                <div value={accesses}>
                  {Module.path.map(eachPath => (
                    <div
                      className={`bg-white text-sm px-2 py-1 inline-flex mr-2 mb-2 rounded border lowercase cursor-pointer hover:bg-blue-100 hover:border-blue-200 hover:text-blue-500 ${
                        accesses.includes(eachPath._id)
                          ? 'border-secondary bg-secondary text-white'
                          : ''
                      }`}
                      key={`${eachPath._id}-${role._id}`}
                      value={eachPath._id}
                      onClick={(_, module_id) =>
                        this.handleAccessUpdate(
                          accesses,
                          role._id,
                          Module._id,
                          eachPath._id,
                        )
                      }
                    >
                      {eachPath.access_type}{' '}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <button
            className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
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

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withReducer, withSaga, withConnect)(AccessManagePage);
