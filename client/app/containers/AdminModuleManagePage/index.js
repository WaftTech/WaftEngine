/**
 *
 * AdminModuleManage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import VpnKey from '@material-ui/icons/VpnKey';
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
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import Loading from '../../components/loading';

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
    const tableData = data.map(({ _id, module_name, description }) => [
      module_name,
      description,
      <>
        <button
          className={classes.tableActionButton}
          onClick={() => this.handleEdit(_id)}
        >
          <CreateIcon />
        </button>

        <button
          className={classes.tableActionButton}
          onClick={() => this.handleAccessEdit(_id)}
        >
          <VpnKey />
        </button>
      </>,
    ]);

    return(
      <>
        <Helmet>
          <title>Module Manage</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Module Manage</PageHeader>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAdd}
          >
            <AddIcon />
          </Fab>
        </div>

        <PageContent>
          <div className="flex justify-end">
            <div className="waftformgroup flex relative">
              <input
                type="text"
                name="find_module_name"
                id="module-name"
                placeholder="Search modules by name"
                className="m-auto Waftinputbox"
                value={query.find_module_name}
                onChange={this.handleQueryChange}
              />
              <IconButton
                aria-label="Search"
                className={`${classes.waftsrch} waftsrchstyle`}
                onClick={this.handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <Table
            tableHead={['Module Name', 'Description', 'Action']}
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
