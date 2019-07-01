/**
 *
 * AdminErrorManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import Helmet from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import { Paper, Divider, Button } from '@material-ui/core';
import CustomInput from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import Table from 'components/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import DeleteDialog from '../../components/DeleteDialog';
import Loading from '../../components/loading';

const styles = theme => ({
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

/* eslint-disable react/prefer-stateless-function */
export class AdminErrorManagePage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    errorDeleteRequest: PropTypes.func.isRequired,
    deleteAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = {
    open: false,
    deleteId: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleOpenAll = id => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAll = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.errorDeleteRequest(id);
    this.setState({ open: false, deleteId: '' });
  };

  handleDeleteAll = () => {
    this.props.deleteAllRequest();
    this.setState({ open: false });
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
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ error_message, error_stack, error_type, added_at, _id }) => [
        error_message,
        error_stack,
        error_type,
        moment(added_at).format('MMM Do YY'),
        <React.Fragment>
          <Tooltip
            id="tooltip-top-start"
            title="Remove from list"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleOpen(_id)}
            >
              <Close
                className={`${classes.tableActionButtonIcon} ${classes.close}`}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>,
      ],
    );
    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() =>
            this.state.deleteId && this.state.deleteId != ''
              ? this.handleDelete(this.state.deleteId)
              : this.handleDeleteAll()
          }
        />
        <Helmet>
          <title>Error Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Error Manage</PageHeader>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleOpenAll}
          >
            Delete All
          </Button>
        </div>
        <PageContent>
          <div className="flex justify-end">
            <div className="waftformgroup flex relative">
              <input
                type="text"
                name="find_errors"
                id="error-message"
                placeholder="Search Errors"
                className="m-auto Waftinputbox"
                value={query.find_errors}
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
            tableHead={[
              'Error Message',
              'Error Stack',
              'Error Type',
              'Added At',
              'Actions',
              '',
            ]}
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

const withReducer = injectReducer({ key: 'adminErrorManagePage', reducer });
const withSaga = injectSaga({ key: 'adminErrorManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminErrorManagePage);
