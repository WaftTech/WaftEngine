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
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectHelper,
  makeSelectLoading,
  makeSelectOne,
  makeSelectUsers,
  makeSelectCategory,
  makeSelectChip,
  makeSelectTag,
  makeSelectMetaTag,
  makeSelectMetaKeyword,
  makeSelectErrors,
} from './selectors';
import { DATE_FORMAT } from '../../App/constants';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Modal from '../../../components/Modal';
import Loading from '../../../components/Loading';
import LinkBoth from '../../../components/LinkBoth';
import QuickEdit from './AddEditPage/QuickEdit';

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
    loadOneRequest: PropTypes.func.isRequired,
    loadUsersRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
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

  // for quick edit state

  handleLoadOne = id => {
    this.props.loadOneRequest(id);
    this.props.loadCategoryRequest();
    this.props.loadUsersRequest();
    this.props.setValue({ name: 'helper', key: 'showQuickEdit', value: true });
  };

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setOneValue({ key: name, value: newContent });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  slugify = text =>
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const slug = this.slugify(event.target.value);
      this.props.setOneValue({ key: 'slug_url', value: slug });
    }
  };

  handleDropDownChange = name => e => {
    e.persist();
    this.props.setOneValue({ key: name, value: e.target.value });
  };

  handleMultipleSelectCategoryChange = e => {
    this.props.setCategoryValue({ value: e && e.map(each => each.value) });
  };

  handleTempMetaKeyword = e => {
    e.persist();
    this.props.setMetaKeywordValue(e.target.value);
  };

  handleTempMetaTag = e => {
    e.persist();
    this.props.setMetaTagValue(e.target.value);
  };

  handleTempTag = e => {
    e.persist();
    this.props.setTagValue(e.target.value);
  };

  handlePublishedOn = date => {
    // this.setState({ startDate: date });
    this.props.setOneValue({
      key: 'published_on',
      // value: moment(date).format('YYYY-MM-DD'),
      value: date,
    });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleMetaKeywordDelete = index => () => {
    const chipData = [...this.props.one.keywords];

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'keywords', value: chipData });
  };

  handleMetaTagDelete = index => () => {
    const chipData = [...this.props.one.meta_tag];

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'meta_tag', value: chipData });
  };

  handleDelete = index => () => {
    const chipData = [...this.props.one.tags];
    // const tags = [...chipData.slice(0, index), ...chipData.slice(index + 1)];
    chipData.splice(index, 1);
    this.props.setOneValue({
      key: 'tags',
      value: chipData,
    });
  };

  insertTags = event => {
    event.preventDefault();
    if (this.props.one.tags.indexOf(this.props.tempTag) === -1) {
      this.props.setOneValue({
        key: 'tags',
        value: [...this.props.one.tags, this.props.tempTag],
      });
      this.props.setTagValue('');
    }
    return { tempTag: this.props.setTagValue('') };
  };

  insertMetaTags = event => {
    event.preventDefault();
    if (this.props.one.meta_tag.indexOf(this.props.tempMetaTag) === -1) {
      this.props.setOneValue({
        key: 'meta_tag',
        value: [...this.props.one.meta_tag, this.props.tempMetaTag],
      });
      this.props.setMetaTagValue('');
    }
    return { tempMetaTag: this.props.setMetaTagValue('') };
  };

  insertMetaKeywords = event => {
    event.preventDefault();
    if (this.props.one.keywords.indexOf(this.props.tempMetaKeyword) === -1) {
      this.props.setOneValue({
        key: 'keywords',
        value: [...this.props.one.keywords, this.props.tempMetaKeyword],
      });
      this.props.setMetaKeywordValue('');
    }
    return { tempMetaKeyword: this.props.setMetaKeywordValue('') };
  };

  // for quick edit end

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
      helper: { showQuickEdit },
    } = this.props;
    const {
      one,
      category,
      chip,
      tempTag,
      tempMetaTag,
      tempMetaKeyword,
      users,
      errors,
    } = this.props;

    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({
        title,
        slug_url,
        category,
        added_at,
        published_on,
        is_published,
        is_active,
        author,
        _id,
      }) => [
        <Link
          to={`/blog/${slug_url}`}
          target="_blank"
          className="text-indigo-600 cursor-pointer hover:underline"
        >
          {title}
        </Link>,
        (category && category.map(each => each.title).join(', ')) || 'No',
        <span className="whitespace-no-wrap">
          {moment(added_at).format(DATE_FORMAT)}
        </span>,
        <span className="whitespace-no-wrap">
          {moment(published_on).format(DATE_FORMAT)}
        </span>,
        `${is_published}`,
        `${is_active}`,
        // tags.join(','),
        <span className="whitespace-no-wrap">{author && author.name}</span> ||
          '',
        <div className="flex">
          <Tooltip title="Quick Edit">
            <button
              aria-label="Edit"
              type="button"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleLoadOne(_id)}
            >
              <i className="material-icons text-green-400 text-base  hover:text-green-500">
                edit
              </i>
            </button>
          </Tooltip>
          <Tooltip title="Edit">
            <button
              aria-label="Edit"
              type="button"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleEdit(_id)}
            >
              <i className="material-icons  text-base text-indigo-500 hover:text-indigo-700">
                edit
              </i>
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button
              className="ml-2 px-1 text-center leading-none"
              type="button"
              onClick={() => this.handleOpen(_id)}
            >
              <i className="material-icons text-base text-red-400 hover:text-red-600">
                delete
              </i>
            </button>
          </Tooltip>
        </div>,
      ],
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
        <Modal
          open={showQuickEdit}
          handleClose={() =>
            this.props.setValue({
              name: 'helper',
              key: 'showQuickEdit',
              value: false,
            })
          }
          handleUpdate={this.handleSave}
        >
          <QuickEdit
            handleEditorChange={this.handleEditorChange}
            handleCheckedChange={this.handleCheckedChange}
            handleChange={this.handleChange}
            slugify={this.slugify}
            handleDropDownChange={this.handleDropDownChange}
            handleMultipleSelectCategoryChange={
              this.handleMultipleSelectCategoryChange
            }
            handleTempMetaKeyword={this.handleTempMetaKeyword}
            handleTempMetaTag={this.handleTempMetaTag}
            handlePublishedOn={this.handlePublishedOn}
            handleSave={this.handleSave}
            handleMetaKeywordDelete={this.handleMetaKeywordDelete}
            handleMetaTagDelete={this.handleMetaTagDelete}
            handleDelete={this.handleDelete}
            insertTags={this.insertTags}
            insertMetaTags={this.insertMetaTags}
            insertMetaKeywords={this.insertMetaKeywords}
            one={one}
            category={category}
            users={users}
            tempTag={tempTag}
            tempMetaTag={tempMetaTag}
            tempMetaKeyword={tempMetaKeyword}
            errors={errors}
          />
        </Modal>
        <div className="flex justify-between mt-3 mb-3">
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
              type="button"
              className="bg-indigo-700 text-white px-2 py-px items-center flex hover:bg-indigo-600"
              onClick={this.handleAdd}
            >
              <i className="material-icons">add</i>Add Post
            </button>
          </div>

          <Table
            className="fixed-layout"
            tableHead={[
              'Title',
              'Category',
              'Added At',
              'Published On',
              'Is Published',
              'Is Active',
              'Author',
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
  helper: makeSelectHelper(),
  loading: makeSelectLoading(),
  // for quick edit
  one: makeSelectOne(),
  category: makeSelectCategory(),
  chip: makeSelectChip(),
  tempTag: makeSelectTag(),
  tempMetaTag: makeSelectMetaTag(),
  tempMetaKeyword: makeSelectMetaKeyword(),
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
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
