import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import {
  FaArrowLeft,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import WECkEditior from '../../../../components/CkEditor';
import Dialog from '../../../../components/Dialog/index';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Select from '../../../../components/Select';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectCategory,
  makeSelectChip,
  makeSelectErrors,
  makeSelectLoading,
  makeSelectMetaKeyword,
  makeSelectMetaTag,
  makeSelectOne,
  makeSelectTag,
  makeSelectUsers
} from '../selectors';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    loadUsersRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    one: PropTypes.object.isRequired,
    category: PropTypes.array,
    tempTag: PropTypes.string,
    push: PropTypes.func.isRequired,
  };

  state = {
    tempImage: '',
    startDate: new Date(),
    selected: [],
    slug_generated: false,
    openMedia: false,
  };

  componentDidMount() {
    this.props.clearOne();
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
    this.props.loadUsersRequest();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const { one } = nextProps;
      if (one.image && one.image.fieldname) {
        const tempImage =
          one.image && one.image.path && `${IMAGE_BASE}${one.image.path}`;
        this.setState({ ...one, tempImage });
      }
      if (one.published_on) {
        this.setState({ startDate: new Date(one.published_on) });
      }
    }
  }

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setOneValue({ key: name, value: newContent });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  slugify = text =>
    // return text
    //   .toString()
    //   .toLowerCase()
    //   .replace(/\s+/g, '-') // Replace spaces with -
    //   .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    //   .replace(/\-\-+/g, '-') // Replace multiple - with single -
    //   .replace(/^-+/, '') // Trim - from start of text
    //   .replace(/-+$/, '')
    //   .escape(); // Trim - from end of text

    // const date = moment(this.state.startDate).format('YYYY/MM/DD');
    // const serial = Math.floor(1000 + Math.random() * 9000).toString();
    // const slug = date + '/' + serial;
    // this.setState({ slug_generated: true });

    // return slug;

    // nepali slug
    text
      .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
      .toLowerCase()
      .replace(/^\s+|\s+$/gm, '')
      .replace(/\s+/g, '-')
      .trim()
      .toLowerCase();

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

  // handleMultipleSelectChange = e => {
  //   e.persist();
  //   this.props.setCategoryValue(e.target.value);
  // };

  handleMultipleSelectCategoryChange = e => {
    this.props.setCategoryValue({ value: e && e.map(each => each.value) });
  };

  handleMultipleSelectAuthorChange = e => {
    this.props.setAuthorValue({ value: e && e.map(each => each.value) });
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

  handleClose = () => {
    this.setState({ openMedia: false });
  };

  handleSetImage = () => {
    this.setState({ openMedia: true });
  };

  handleImageChange = file => {
    this.props.setOneValue({ key: 'image', value: file });
    this.setState({ openMedia: false });
  };

  onDrop = (files, name) => {
    const file = files[0];
    this.props.setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.setState({ tempImage: reader.result });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  // handlePublishedOn = event => {
  //   event.persist();
  //   const published_on = moment(event.target.value);
  //   this.props.setOneValue({
  //     key: 'published_on',
  //     value: published_on.format(DATE_FORMAT),
  //   });
  // };

  handlePublishedOn = date => {
    this.setState({ startDate: date });
    this.props.setOneValue({
      key: 'published_on',
      value: moment(date).format('YYYY-MM-DD HH:mm'),
    });
  };

  handleGoBack = () => {
    this.props.push('/admin/blog-manage');
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
    if (this.props.tempTag.trim() !== '') {
      if (this.props.one.tags.indexOf(this.props.tempTag) === -1) {
        this.props.setOneValue({
          key: 'tags',
          value: [...this.props.one.tags, this.props.tempTag],
        });
        this.props.setTagValue('');
      }
    }
    return { tempTag: this.props.setTagValue('') };
  };

  insertMetaTags = event => {
    event.preventDefault();
    if (this.props.tempMetaTag.trim() !== '') {
      if (this.props.one.meta_tag.indexOf(this.props.tempMetaTag) === -1) {
        this.props.setOneValue({
          key: 'meta_tag',
          value: [...this.props.one.meta_tag, this.props.tempMetaTag],
        });
        this.props.setMetaTagValue('');
      }
    }
    return { tempMetaTag: this.props.setMetaTagValue('') };
  };

  insertMetaKeywords = event => {
    event.preventDefault();
    if (this.props.tempMetaKeyword.trim() !== '') {
      if (this.props.one.keywords.indexOf(this.props.tempMetaKeyword) === -1) {
        this.props.setOneValue({
          key: 'keywords',
          value: [...this.props.one.keywords, this.props.tempMetaKeyword],
        });
        this.props.setMetaKeywordValue('');
      }
    }
    return { tempMetaKeyword: this.props.setMetaKeywordValue('') };
  };

  handleSelectedValue = (ids, cats) => {
    const selected = ids.map(
      each => Object.keys(cats).length && cats[each].title,
    );
    return selected.join(', ');
  };

  render() {
    const {
      classes,
      one,
      category,
      users,
      tempTag,
      tempMetaTag,
      tempMetaKeyword,
      match,
      loading,
      errors,
    } = this.props;
    const { tempImage } = this.state;

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

    const cats = {};
    category.map(e => {
      cats[e._id] = e;
      return null;
    });
    return loading && loading == true ? (
      <Loading />
    ) : (
        <>
          <Helmet>
            <title>
              {match && match.params && match.params.id
                ? 'Edit Blog'
                : 'Add Blog'}
            </title>
          </Helmet>
          <Dialog
            open={this.state.openMedia}
            className="w-5/6"
            onClose={this.handleClose}
            title={`Select Media Files`}
            body={
              <div>
                <EditorFileSelect
                  location={location}
                  selectFile={file => this.handleImageChange(file)}
                />
                <div className="mt-2 text-xs">
                  Note: Please Double Click to open folder and select images.
              </div>
              </div>
            }
          />
          <div className="flex justify-between my-3">
            <PageHeader>
              <span className="backbtn" onClick={this.handleGoBack}>
                <FaArrowLeft className="text-xl" />
              </span>
              {match && match.params && match.params.id
                ? 'Edit Blog'
                : 'Add Blog'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <label>Title</label>
              <input
                className="inputbox"
                id="blog-title"
                type="text"
                value={(one && one.title) || ''}
                name="Blog Title"
                onChange={this.handleChange('title')}
              />
              {errors && errors.title && errors.title.trim() !== '' && (
                <div className="error">{errors && errors.title}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label>Slug</label>
              <input
                className="inputbox"
                id="blog-slug-url"
                type="text"
                value={(one && one.slug_url) || ''}
                name="Blog Slug"
                onChange={this.handleChange('slug_url')}
              />
              {errors && errors.slug_url && errors.slug_url.trim() !== '' && (
                <div className="error">{errors && errors.slug_url}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label>Category</label>
              <Select
                id="category"
                value={
                  (one.category &&
                    one.category.map((each, index) => {
                      const catObj = listCategoryNormalized[each];
                      if (!catObj) {
                        return {
                          label: 'loading',
                          value: index,
                        };
                      }
                      return catObj;
                    })) ||
                  []
                }
                name="category"
                placeholder="Select Blog Category"
                onChange={this.handleMultipleSelectCategoryChange}
                isSearchable
                isMulti
                options={listCategory}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="short_description">Short Description</label>
              <textarea
                className="inputbox"
                id="short_description"
                type="text"
                value={one.short_description || ''}
                name="short_description"
                onChange={this.handleChange('short_description')}
              />
            </div>
            <div>
              <label>Blog Description</label>
              <WECkEditior
                description={one.description}
                setOneValue={this.props.setOneValue}
              />
              {errors &&
                errors.description &&
                errors.description.trim() !== '' && (
                  <div className="error">{errors && errors.description}</div>
                )}
            </div>

            <div className="w-full md:w-3/5 pb-4 mt-4">
              <label htmlFor="Image">Image</label>

              <section
                onClick={this.handleSetImage}
                className="text-black hover:border-primary hover:text-primary text-center self-start py-3 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"
              >
                {one && one.image && one.image.path ? (
                  <div>
                    <img src={`${IMAGE_BASE}${one.image.path}`} />
                  </div>
                ) : (
                    <button
                      type="button"
                      className="text-black py-2 px-4 rounded font-bold bg-waftprimary hover:text-primary"
                    >
                      Featured Image
                    </button>
                  )}
              </section>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="published_on">Published On</label>
              <DatePicker
                showTimeSelect
                className="inputbox"
                dateFormat="Pp"
                // selected={new Date(one.published_on)}
                selected={this.state.startDate}
                onChange={this.handlePublishedOn}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
                showTimeInput
              />
              {/* <input
              className="inputbox"
              id="blog-title"
              type="date"
              value={
                (one.published_on &&
                  moment(one.published_on).format("YYYY-MM-DD")) ||
                moment(Date.now()).format("YYYY-MM-DD")
              }
              name="published_on"
              onChange={this.handlePublishedOn}
            /> */}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="blog-tags">Tags</label>
              <form onSubmit={this.insertTags}>
                <input
                  className="inputbox"
                  id="blog-tags"
                  type="text"
                  value={tempTag || ''}
                  name="Tags"
                  onChange={this.handleTempTag}
                />
              </form>
              {one.tags.map((tag, index) => (
                <label className="tag" key={`${tag}-${index}`}>
                  {tag}
                  <span>
                    <FaTimes onClick={this.handleDelete(index)} />
                  </span>
                </label>
              ))}
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="blog-meta-tags">Meta Tags</label>
              <form onSubmit={this.insertMetaTags}>
                <input
                  className="inputbox"
                  id="blog-meta-tags"
                  type="text"
                  value={tempMetaTag || ''}
                  name="Tags"
                  onChange={this.handleTempMetaTag}
                />
              </form>
              {one.meta_tag.map((tag, index) => {
                const icon = null;

                return (
                  <label className="tag" key={`meta-${tag}-${index}`}>
                    {tag}
                    <span>
                      <FaTimes onClick={this.handleMetaTagDelete(index)} />
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="blog-meta-keyword">Meta Keywords</label>

              <form onSubmit={this.insertMetaKeywords}>
                <input
                  className="inputbox"
                  id="blog-meta-keyword"
                  type="text"
                  value={tempMetaKeyword || ''}
                  name="Tags"
                  onChange={this.handleTempMetaKeyword}
                />
              </form>
              {one.keywords.map((tag, index) => {
                const icon = null;

                return (
                  <label
                    onDelete={this.handleMetaKeywordDelete(index)}
                    className="tag"
                    key={`metakeywords-${tag}-${index}`}
                  >
                    {tag}
                    <span>
                      <FaTimes />
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="blog-meta-description">Meta Description</label>

              <textarea
                className="inputbox"
                id="blog-meta-description"
                type="text"
                value={one.meta_description || ''}
                name="meta-description"
                onChange={this.handleChange('meta_description')}
              />
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label htmlFor="blog_author">Author</label>
              <Select
                className="React_Select"
                id="category"
                value={
                  (one.author &&
                    one.author.map((each, index) => {
                      const authorObj = listAuthorNormalized[each];
                      if (!authorObj) {
                        return {
                          label: null,
                          value: index,
                        };
                      }
                      return authorObj;
                    })) ||
                  []
                }
                name="author"
                placeholder="Select Blog Author"
                onChange={this.handleMultipleSelectAuthorChange}
                isSearchable
                isMulti
                options={listAuthor}
              />
            </div>
            {errors && errors.author && errors.author.trim() !== '' && (
              <div className="error">{errors && errors.author}</div>
            )}
            <div className="checkbox">
              <input
                onClick={this.handleCheckedChange('is_active')}
                checked={one.is_active || false}
                id="is_active"
                type="checkbox"
              />
              <label htmlFor="is_active">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
              Is Active
            </label>
            </div>

            <div className="checkbox">
              <input
                checked={one.is_published || false}
                onClick={this.handleCheckedChange('is_published')}
                id="is_published"
                type="checkbox"
              />
              <label htmlFor="is_published">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
              Is Published
            </label>
            </div>

            <div className="checkbox">
              <input
                checked={one.is_highlight || false}
                onClick={this.handleCheckedChange('is_highlight')}
                id="is_highlight"
                type="checkbox"
              />
              <label htmlFor="is_highlight">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
              Is Highlighted
            </label>
            </div>

            <div className="checkbox">
              <input
                checked={one.is_showcase || false}
                onClick={this.handleCheckedChange('is_showcase')}
                id="is_showcased"
                type="checkbox"
              />
              <label htmlFor="is_showcased">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
              Is Showcase
            </label>
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <button
                className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
                onClick={this.handleSave}
                disabled={loading}
              >
                Save
            </button>
            </div>
          </PageContent>
        </>
      );
  }
}

const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
  chip: makeSelectChip(),
  tempTag: makeSelectTag(),
  tempMetaTag: makeSelectMetaTag(),
  tempMetaKeyword: makeSelectMetaKeyword(),
  loading: makeSelectLoading(),
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withReducer, withSaga, withConnect)(AddEdit);
