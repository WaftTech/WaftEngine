/**
 *
 * CommentManagePage
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
import ViewIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
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

/* eslint-disable react/prefer-stateless-function */
export class BlogCommentManagePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = {
    selected: [],
    selectAll: false,
    selectApproved: false,
    selectDisapproved: false,
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

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

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.props.loadAllRequest(this.props.query);
    }
  };

  handleView = id => {
    this.props.push(`/admin/comment/view/${id}`);
  };

  handleSelectApproved = () => {
    if (this.state.selectApproved === false) {
      this.props.getApprovedRequest(this.props.query);
    } else {
      this.props.loadAllRequest(this.props.query);
    }
    this.setState({ selectApproved: !this.state.selectApproved });
  };

  handleSelectDisapproved = () => {
    if (this.state.selectDisapproved === false) {
      this.props.getDisapprovedRequest(this.props.query);
    } else {
      this.props.loadAllRequest(this.props.query);
    }
    this.setState({ selectDisapproved: !this.state.selectDisapproved });
  };

  handleSelectAll = () => {
    this.setState({ selectAll: !this.state.selectAll });
  };

  // handleDisapprove = id => {
  //   this.props.loadDisapproveRequest(id);
  // };

  handleCheckedChange = id => {
    const index = this.state.selected.indexOf(id);
    if (index > -1) {
      let removed = [
        ...this.state.selected.slice(0, index),
        ...this.state.selected.slice(index + 1),
      ];
      this.setState({ selected: removed });
    } else {
      let added = [...this.state.selected, id];
      this.setState({ selected: added });
    }
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
      ({ title, blog_id, status, added_at, added_by, updated_at, _id }) => [
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  this.state.selectAll === true
                    ? true
                    : this.state.selected.includes(_id)
                    ? true
                    : false
                }
                onChange={() => this.handleCheckedChange(_id)}
              />
            }
          />
        </>,
        title,
        blog_id && blog_id.title,
        status || 'onhold',
        added_by && added_by.name,
        moment(added_at).format(DATE_FORMAT),
        moment(updated_at).format(DATE_FORMAT),
        <>
          <Tooltip
            id="tooltip-top-start"
            title="View"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleView(_id)}
            >
              <ViewIcon
                className={`${classes.tableActionButtonIcon} ${classes.view}`}
              />
            </IconButton>
          </Tooltip>
          {/* <button
            className="ml-2 underline text-blue-500"
            onClick={() => this.handleApprove(_id, 'approve')}
          >
            Approve
          </button>
          <button
            className="ml-2 underline text-primary"
            onClick={() => this.handleDisapprove(_id, 'disapprove')}
          >
            Disapprove
          </button> */}
        </>,
      ],
    );
    return (
      <>
        <Helmet>
          <title>Blog Comments</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading === true ? <Loading /> : <></>}
          <PageHeader>Blog Comment Listing</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-end">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.selectApproved}
                  onChange={this.handleSelectApproved}
                />
              }
              label="Approved"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.selectDisapproved}
                  onChange={this.handleSelectDisapproved}
                />
              }
              label="Disapproved"
            />
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_title"
                id="comment-title"
                placeholder="Search Blog Comment"
                className="m-auto inputbox"
                value={query.find_title}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleEnter}
              />
            </div>
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_blog_id"
                id="blog-of-comment"
                placeholder="Search Blogs"
                className="m-auto inputbox"
                value={query.find_blog_id}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleEnter}
              />
            </div>
            <div className="flex relative mr-2">
              <IconButton
                aria-label="Search"
                className={`${classes.waftsrch} waftsrchstyle`}
                onClick={this.handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <div className="ml-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.selectAll}
                  onChange={this.handleSelectAll}
                />
              }
              label="Select All"
            />
          </div>

          <Table
            tableHead={[
              'Selected',
              'Comment Title',
              'Blog',
              'Status',
              'Added By',
              'Added At',
              'Updated At',
              'Actions',
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

const withReducer = injectReducer({
  key: 'blogCommentManagePage',
  reducer,
});
const withSaga = injectSaga({ key: 'blogCommentManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogCommentManagePage);
