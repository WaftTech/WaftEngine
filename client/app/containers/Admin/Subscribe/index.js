/**
 *
 * Subscribe
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import View from '@material-ui/icons/RemoveRedEyeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Table from 'components/Table/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';

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
export class Subscribe extends React.PureComponent {
  static propTypes = {
    loadSubscriberRequest: PropTypes.func.isRequired,
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
    this.props.loadSubscriberRequest(this.props.query);
  }

  handleView = id => {
    this.props.push(`/admin/subscribe-manage/view/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadSubscriberRequest(this.props.query);
  };

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.deleteOneRequest(id);
    this.setState({ open: false });
  };

  handlePagination = paging => {
    this.props.loadSubscriberRequest(paging);
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ _id, email, is_subscribed, added_at }) => [
      email,
      `${is_subscribed}`,
      moment(added_at).format(DATE_FORMAT),

      <React.Fragment>
        <Tooltip id="tooltip-top" title="View subscribe" placement="top">
          <IconButton
            className={classes.tableActionButton}
            onClick={() => this.handleView(_id)}
          >
            <View />
          </IconButton>
        </Tooltip>
        <Tooltip id="tooltip-top" title="Remove" placement="top">
          <IconButton
            className={classes.tableActionButton}
            onClick={() => this.handleOpen(_id)}
          >
            <Close />
          </IconButton>
        </Tooltip>
      </React.Fragment>,
    ]);
    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Subscriber List</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Subscribe Manage</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="flex">
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_email"
                id="email"
                placeholder="Search Subscriber"
                className="m-auto inputbox"
                value={query.find_email}
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
            tableHead={['Email', 'Is Subscribed', 'Added at', 'Actions']}
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

const withReducer = injectReducer({ key: 'adminSubscribePage', reducer });
const withSaga = injectSaga({ key: 'adminSubscribePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(Subscribe);
