import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
import { Checkbox } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// core components
import Table from 'components/Table';

import { DATE_FORMAT } from '../../App/constants';
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
    startDate: new Date(),
    cleared: false,
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
    this.props.loadCategoryRequest();
    this.props.loadUsersRequest();
  }

  shouldComponentUpdate(props) {
    if (this.state.cleared) {
      this.setState({ cleared: false });
      props.loadAllRequest(props.query);
    }
    if (
      props.query.size != this.props.query.size ||
      props.query.page != this.props.query.page
    ) {
      props.loadAllRequest(props.query);
    }
    return true;
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/blog-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/blog-manage/edit/${id}`);
  };

  handleView = slug_url => {
    this.props.push(`/news/${slug_url}`);
  };

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteBlog = id => {
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

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handlePagination = paging => {
    this.props.setQueryValue({ key: 'page', value: paging.page });
    this.props.setQueryValue({ key: 'size', value: paging.size });
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

  handleQueryDropDownChange = name => e => {
    this.props.setQueryValue({ key: name, value: e.value });
  };

  handleQueryPublishedOn = date => {
    this.setState({ startDate: date });

    this.props.setQueryValue({
      key: 'find_published_on',
      value: moment(date).format(DATE_FORMAT),
    });
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
      all: { data, page, size, totaldata, msg },
      query,
      loading,
      users,
      category,
    } = this.props;

    let listCategoryNormalized = {};
    const listCategory = category.map(each => {
      const obj = {
        label: each.title,
        value: each._id,
      };
      listCategoryNormalized = {
        ...listCategoryNormalized,
        [each._id]: obj,
      };
      return obj;
    });

    listCategory.unshift({ label: 'All', value: '' });

    let listAuthorNormalized = {};
    const listAuthor = users.map(each => {
      const obj = {
        label: each.name,
        value: each._id,
      };
      listAuthorNormalized = {
        ...listAuthorNormalized,
        [each._id]: obj,
      };
      return obj;
    });

    listAuthor.unshift({ label: 'All', value: '' });

    const {
      one,
      chip,
      tempTag,
      tempMetaTag,
      tempMetaKeyword,
      errors,
      helper: { showQuickEdit },
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
        // is_active,
        // is_highlight,
        // is_showcase,
        author,
        _id,
      }) => [
        <>
          <Link
            to={`/news/${moment(added_at).format('YYYY/MM/DD')}/${_id}`}
            target="_blank"
            className="block font-bold text-base text-secondary cursor-pointer hover:underline"
          >
            {title}
          </Link>{' '}
          <div className="flex py-2">
            <button
              aria-label="Edit"
              type="button"
              className="border-r px-1 text-center leading-none hover:text-secondary whitespace-no-wrap text-sm"
              onClick={() => this.handleEdit(_id)}
            >
              Edit
            </button>
            <button
              aria-label="Edit"
              type="button"
              className="border-r px-1 text-center leading-none hover:text-secondary whitespace-no-wrap text-sm"
              onClick={() => this.handleLoadOne(_id)}
            >
              Quick Edit
            </button>

            <button
              className="px-1 text-center leading-none text-red-500 whitespace-no-wrap text-sm"
              type="button"
              onClick={() => this.handleOpen(_id)}
            >
              Delete
            </button>
          </div>
        </>,
        (category && category.map(each => each.title).join(', ')) || 'No',
        <span className="whitespace-no-wrap">
          {moment(added_at).format(DATE_FORMAT)}
        </span>,
        <span className="whitespace-no-wrap">
          {moment(published_on).format('YYYY-MM-DD HH:mm')}
        </span>,
        // `${is_highlight}`,
        // `${is_showcase}`,
        // `${is_active}`,
        <>
          {is_published ? (
            <i className="material-icons">check</i>
          ) : (
            <i className="material-icons">not_interested</i>
          )}{' '}
        </>,
        // tags.join(','),
        (
          <p className="">
            {author &&
              author.length > 0 &&
              author.map(author => author.name).join(', ')}
          </p>
        ) || '',
      ],
    );

    const activeData =
      data && data.length > 0
        ? data.map(({ is_highlight }) => [!is_highlight])
        : [];

    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDeleteBlog(this.state.deleteId)}
        />
        <Helmet>
          <title>News Listing</title>
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
          <PageHeader>
            News
            <span className="text-sm border-r-1 p-2 m-2 ml-6">
              Published({msg && msg.published ? msg.published : null})
            </span>
            <span className="text-sm border-r-1 p-2 m-2 -ml-2">
              Active({msg && msg.active ? msg.active : null})
            </span>
            <span className="text-sm border-r-1 p-2 m-2 -ml-2">
              Highlight({msg && msg.highlight ? msg.highlight : null})
            </span>
            <span className="text-sm p-2 m-2 -ml-2">
              Showcase({msg && msg.showcase ? msg.showcase : null})
            </span>
          </PageHeader>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            round="true"
            onClick={this.handleAdd}
            elevation={0}
          >
            <AddIcon />
          </Fab>
        </div>
        <div className="bg-white rounded p-2 mb-4">
          <div className="flex -mx-1 items-center">
            {/* <div className="px-2 flex-1">
              <input
                type="text"
                name="find_title"
                id="blog-title"
                placeholder="Search News Title"
                className="inputbox"
                value={query.find_title}
                onChange={this.handleQueryChange}
                onKeyPress={this.handleKeyPress}
              />
            </div> */}
            <div className="px-1 w-1/6">
              <label className="text-sm">Category</label>
              <Select
                className="React_Select"
                id="category"
                placeholder="All"
                value={listCategoryNormalized[query.find_category] || null}
                classNamePrefix="select"
                onChange={this.handleQueryDropDownChange('find_category')}
                isSearchable
                options={listCategory}
                styles={customStyles}
              />
            </div>
            <div className="px-1 w-1/6">
              <label className="text-sm">Author</label>
              <Select
                className="React_Select"
                id="author"
                placeholder="All"
                value={listAuthorNormalized[query.find_author] || null}
                classNamePrefix="select"
                onChange={this.handleQueryDropDownChange('find_author')}
                isSearchable
                options={listAuthor}
                styles={customStyles}
              />
            </div>

            <div className="px-1 w-1/6">
              <label className="text-sm">Showcase</label>

              <select
                name="find_is_showcase"
                value={query.find_is_showcase}
                onChange={this.handleQueryChange}
                className="inputbox"
              >
                <option value="">All</option>
                <option value="true">Showcase</option>
                <option value="false">Not Showcase</option>
              </select>
            </div>
            <div className="px-1 w-1/6">
              <label className="text-sm">Published</label>
              <select
                name="find_is_published"
                value={query.find_is_published}
                onChange={this.handleQueryChange}
                className="inputbox"
              >
                <option value="">All</option>
                <option value="true">Published</option>
                <option value="false">Not Published</option>
              </select>
            </div>
            <div className="px-1 w-1/6">
              <label className="text-sm">Active</label>
              <select
                name="find_is_active"
                value={query.find_is_active}
                onChange={this.handleQueryChange}
                className="inputbox"
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Not Active</option>
              </select>
            </div>
            <div className="px-1 w-1/6">
              <label className="text-sm" htmlFor="grid-last-name">
                Published On
              </label>
              <DatePicker
                className="inputbox"
                selected={this.state.startDate}
                onChange={this.handleQueryPublishedOn}
                isClearable
              />
            </div>
            <div className="px-1 w-1/6">
              <button
                aria-label="Search"
                className="bg-secondary mt-4 px-4 py-2 font-lg block text-white text-center w-full rounded leading-tighter mt-6"
                onClick={this.handleSearch}
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <PageContent loading={loading}>
          <Table
            className="fixed-layout"
            tableHead={[
              'Title',
              'Category',
              'Added At',
              'Publish On',
              // 'Is Highlight',
              // 'Is Showcase',
              // 'Is Active',
              'Is Published',
              'Author',
              // 'Actions',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
            activeData={activeData}
            loading={loading}
            emptyDataMsg="No News Found"
          />
        </PageContent>
      </>
    );
  }
}

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#fff',
    borderColor: '#e0e3e8',
    minHeight: '35px',
    height: '35px',
    width: '100%',
    boxShadow: state.isFocused ? null : null,
    marginRight: '8px',
  }),
  placeholder: state => ({
    color: '#000',
    fontSize: '15px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
};

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
