import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import View from '@material-ui/icons/RemoveRedEyeOutlined';

// core components
import Table from 'components/Table';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import { DATE_FORMAT } from '../../App/constants';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import LinkBoth from '../../../components/LinkBoth';

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
export class BlogManagePage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
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
  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/blog-manage/add');
  };
  handleEdit = id => {
    this.props.push(`/admin/blog-manage/edit/${id}`);
  };
  handleView = slug_url => {
    this.props.push(`/blog/${slug_url}`);
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
      ({
        title,
        slug_url,
        category,
        added_at,
        is_published,
        is_active,
        author,
        _id,
      }) => {
        return [
          <Link to={`/blog/${slug_url}`} target="_blank" className="text-indigo-600 cursor-pointer hover:underline">{title}</Link>,
          (category && category.map(each => each.title).join(', ')) || 'No',
          <span className="whitespace-no-wrap">{moment(added_at).format(DATE_FORMAT)}</span>,
          '' + is_published,
          '' + is_active,
          // tags.join(','),
          <span className="whitespace-no-wrap">{(author && author.name)}</span> || '',
          <div className="flex">
            <button
              aria-label="Edit"
              className="bg-white border border-white px-2 py-1 items-center flex text-indigo-500 hover:shadow"
              onClick={() => this.handleEdit(_id)}
            >
              <i className="material-icons text-base text-indigo-500 mr-1">edit</i>Edit
            </button>

            <button className="ml-2 px-1 text-center leading-none"
              onClick={() => this.handleOpen(_id)}
            >
              <i className="material-icons text-base text-red-400 hover:text-red-600">delete</i>
            </button>
          </div>,
        ];
      },
    );
    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Blog Category Listing</title>
        </Helmet>
        <div className="flex justify-between -mt-5 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Blog Manage</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-between">

            <div className="flex relative">
              <input
                type="text"
                name="find_title"
                id="blog-title"
                placeholder="Search Blogs"
                className="m-auto inputbox"
                value={query.find_title}
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

            <button
              className="bg-indigo-700 text-white px-2 py-px items-center flex hover:bg-indigo-600"
              onClick={this.handleAdd}>
              <i className="material-icons">add</i>Add Post
            </button>

          </div>

          <Table className="fixed-layout"
            tableHead={[
              'Title',
              'Category',
              'Added At',
              'Is Published',
              'Is Active',
              'Author',
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

const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogManagePage);
