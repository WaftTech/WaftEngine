/**
 *
 * AdminModuleManage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';
import lid from '../../../assets/img/lid.svg';
import { FaPlus, FaSearch, FaPencilAlt, FaKey } from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class AdminModuleManage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/module-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/module-manage/edit/${id}`);
  };

  handleAccessEdit = id => {
    this.props.push(`/admin/module-manage/access/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ _id, module_name, description, module_group }) => [
        (module_group && module_group.module_group) || '-',
        module_name,
        description,
        <>
          <div className="flex">
            <button
              aria-label="Edit"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleEdit(_id)}
            >
              <FaPencilAlt className="text-base text-blue-500 hover:text-blue-600" />
            </button>

            <button
              className="ml-2 px-1 text-center leading-none"
              onClick={() => this.handleAccessEdit(_id)}
            >
              <FaKey className="text-base text-green-500 hover:text-green-600" />
            </button>
          </div>
        </>,
      ],
    );

    return (
      <>
        <Helmet>
          <title>Module Manage</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Module Manage</PageHeader>
          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleAdd}
            >
              <FaPlus />
              <span className="pl-2">Add New</span>
            </button>
          </div>
        </div>

        <PageContent loading={loading}>
          <div className="flex">
            <div className="flex relative">
              <input
                type="text"
                name="find_module_name"
                id="module-name"
                placeholder="Search by name"
                className="m-auto inputbox pr-6"
                value={query.find_module_name}
                onChange={this.handleQueryChange}
              />
              <span
                className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
                onClick={this.handleSearch}
              >
                <FaSearch />
              </span>
            </div>
          </div>
          <Table
            tableHead={['Module Group', 'Module Name', 'Description', 'Action']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManage', saga });

const styles = theme => ({
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    color: '#666',
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
)(AdminModuleManage);
