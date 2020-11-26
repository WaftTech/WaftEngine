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
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectRequesting,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

import { FaRegEye } from 'react-icons/fa';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
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
    open: false,
    status: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.requesting != this.props.requesting) {
      if (!nextProps.requesting) {
        this.setState({ open: false });
      }
    }
  }

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleCheckedQueryChange = name => e => {
    e.persist();
    this.props.setQueryValue({ key: name, value: e.target.checked });
    if (name === 'find_is_approved' && this.props.query.find_is_disapproved) {
      this.props.setQueryValue({ key: 'find_is_disapproved', value: false });
    }
    if (name === 'find_is_disapproved' && this.props.query.find_is_approved) {
      this.props.setQueryValue({ key: 'find_is_approved', value: false });
    }
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

  handleSelectAll = all_ids => {
    if (this.state.selectAll === true) {
      this.setState(state => ({
        selectAll: !state.selectAll,
        selected: [],
      }));
    } else {
      this.setState(state => ({
        selectAll: !state.selectAll,
        selected: all_ids,
      }));
    }
  };

  handleOpen = status => {
    this.setState({ open: true, status });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    if (this.state.status === 'Approve') {
      this.props.approveRequest(this.state.selected);
    } else {
      this.props.disapproveRequest(this.state.selected);
    }
  };

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
      requesting,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const selectAll = data.map(e => e._id);
    const tableData = data.map(
      ({ title, blog_id, status, added_at, added_by, updated_at, _id }) => [
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.selected.includes(_id) ? true : false}
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
        moment(updated_at ? updated_at : added_at).format(DATE_FORMAT),
        <>
          <div className="flex">
            <button
              aria-label="Edit"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleView(_id)}
            >
              <FaRegEye className="text-base text-blue-500 hover:text-blue-600" />
            </button>
          </div>
        </>,
      ],
    );
    return (
      <>
        <Helmet>
          <title>Blog Comments</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading === true ? <Loading /> : <></>}
          <PageHeader>Blog Comment Listing</PageHeader>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="approve-disapprove"
        >
          <DialogTitle>
            Are you sure you want to {this.state.status} ?
          </DialogTitle>
          <DialogActions>
            {/* <div> */}
            <button
              onClick={this.handleClose}
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
            >
              No
            </button>
            <button
              onClick={this.handleSave}
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-500 uppercase btn-theme"
            >
              Yes
            </button>
          </DialogActions>
        </Dialog>
        <PageContent loading={loading}>
          <div className="flex">
            <div className="checkbox">
              <input
                checked={query.find_is_approved}
                onChange={this.handleCheckedQueryChange('find_is_approved')}
                id="is_approved"
                type="checkbox"
              />
              <label htmlFor="is_approved">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Is Approved
              </label>
            </div>

            <div className="checkbox">
              <input
                checked={query.find_is_disapproved}
                onChange={this.handleCheckedQueryChange('find_is_disapproved')}
                id="is_disapprove"
                type="checkbox"
              />
              <label htmlFor="is_disapprove">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Disapproved
              </label>
            </div>

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
          <div className="float-right">
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-500 uppercase btn-theme"
              onClick={() => this.handleOpen('Approve')}
            >
              Approve
            </button>
            <button
              className="py-2 px-6 rounded mt-4 ml-4 text-sm text-white bg-primary uppercase btn-theme"
              onClick={() => this.handleOpen('Disapprove')}
            >
              Disapprove
            </button>
          </div>

          <Table
            tableHead={[
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.selectAll}
                    onChange={() => this.handleSelectAll(selectAll)}
                  />
                }
              />,
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
  requesting: makeSelectRequesting(),
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
