/**
 *
 * User
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import qs from 'query-string';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table';
import CreateIcon from '@material-ui/icons/Create';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';

/* eslint-disable react/prefer-stateless-function */
export class User extends React.PureComponent {
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
    const {
      loadAllRequest,
      query,
      location: { search },
      setQueryObj,
    } = this.props;
    let queryObj = { ...query };
    if (search) {
      queryObj = qs.parse(search);
      setQueryObj(queryObj);
    }

    loadAllRequest(queryObj);
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/user-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/user-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
    const queryString = qs.stringify({
      ...this.props.query,
      [e.target.name]: e.target.value,
    });
    this.props.push({
      search: queryString,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
    const queryString = qs.stringify(paging);
    this.props.push({
      search: queryString,
    });
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      loading,
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ _id, email, name, roles, email_verified }) => [
        email,
        name,
        roles.map(each => each.role_title).join(', '),
        `${email_verified}`,
        <>
          <Tooltip id="tooltip-left" title="Edit User" placement="left">
            <IconButton
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(_id)}
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </>,
      ],
    );

    return (
      <>
        <Helmet>
          <title>User Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}

          <PageHeader>User Manage</PageHeader>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAdd}
          >
            <AddIcon />
          </Fab>
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-end">
            <div className="waftformgroup flex relative mr-2">
              <input
                type="text"
                name="find_name"
                id="user-name"
                placeholder="Search User"
                className="m-auto Waftinputbox"
                value={query.find_name}
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
            tableHead={['Email', 'Name', 'Roles', 'Email verified', 'Action']}
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
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
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

const withReducer = injectReducer({ key: 'adminUserManagePage', reducer });
const withSaga = injectSaga({ key: 'adminUserManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(User);
