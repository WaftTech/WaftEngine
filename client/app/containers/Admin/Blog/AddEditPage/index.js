import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import Helmet from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { Checkbox, IconButton } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import BackIcon from '@material-ui/icons/ArrowBack';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectCategory,
  makeSelectChip,
  makeSelectTag,
  makeSelectMetaTag,
  makeSelectMetaKeyword,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';

import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import { IMAGE_BASE } from '../../../App/constants';
import defaultImage from '../../../../assets/img/logo.svg';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/customComponents/Input';

const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },

  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },
});

class AddEdit extends React.PureComponent {

  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    category: PropTypes.array,
    tempTag: PropTypes.string,
    push: PropTypes.func.isRequired,
  };

  state = {
    tempImage: defaultImage,
  };

  componentDidMount() {
    this.props.clearOne();
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const { one } = nextProps;
      if (one.image && one.image.fieldname) {
        const tempImage =
          one.image && one.image.path && `${IMAGE_BASE}${one.image.path}`;
        this.setState({ ...one, tempImage });
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

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleCategoryChange = name => e => {
    e.persist();
    this.props.setOneValue({ key: name, value: e.target.value });
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

  handlePublishedOn = event => {
    event.persist();
    const published_on = moment(event.target.value);
    this.props.setOneValue({
      key: 'published_on',
      value: published_on.format('YYYY-MM-DD'),
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

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'tags', value: chipData });
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

  render() {
    const {
      classes,
      one,
      category,
      tempTag,
      tempMetaTag,
      tempMetaKeyword,
      match,
      loading,
      errors,
    } = this.props;
    const { tempImage } = this.state;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Blog'
              : 'Add Blog'}
          </title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              className={`${classes.backbtn} cursor-pointer`}
              onClick={this.handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {match && match.params && match.params.id
              ? 'Edit Blog'
              : 'Add Blog'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="title"
              inputClassName="Waftinputbox"
              inputId="blog-title"
              value={one.title || ''}
              name="Blog Title"
              onChange={this.handleChange('title')}
              error={errors.title}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="Waftinputbox"
              native="true"
              value={one.category}
              onChange={this.handleCategoryChange('category')}
              inputprops={{
                value: one.category || '',
                name: 'category',
              }}
            >
              <option name="none" value="" disabled>
                None
              </option>
              {category.map(each => (
                <option key={each._id} name={each.title} value={each._id}>
                  {each.title}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="short_description"
            >
              Short Description
            </label>

            <textarea
              className="Waftinputbox"
              id="short_description"
              type="text"
              value={one.short_description || ''}
              name="short_description"
              onChange={this.handleChange('short_description')}
            />
          </div>
          <div className="pb-4">
            <label className="block uppercase tracking-wide text-grey-darker text-xs mb-2">
              Blog Description
            </label>
            <CKEditor
              name="description"
              content={one.description}
              config={{ allowedContent: true }}
              events={{
                change: e => this.handleEditorChange(e, 'description'),
                value: one.description || '',
              }}
            />

            <div id="component-error-text">{errors.description}</div>
          </div>

          <div className="w-full md:w-1/2 pb-4 mt-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="Image"
            >
              Image
            </label>
            <Dropzone onDrop={files => this.onDrop(files, 'image')}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <img
                    className="Waftinputbox cursor-pointer"
                    src={tempImage}
                    alt="Blogimage"
                    style={{ height: '120px', width: '60%' }}
                  />
                </div>
              )}
            </Dropzone>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Published On
            </label>
            <input
              className="Waftinputbox"
              id="blog-title"
              type="date"
              value={
                (one.published_on &&
                  moment(one.published_on).format('YYYY-MM-DD')) ||
                moment(Date.now()).format('YYYY-MM-DD')
              }
              name="published_on"
              onChange={this.handlePublishedOn}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Tags
            </label>
            <form onSubmit={this.insertTags}>
              <input
                className="Waftinputbox"
                id="blog-tags"
                type="text"
                value={tempTag || ''}
                name="Tags"
                onChange={this.handleTempTag}
              />
            </form>
            <Paper>
              {one.tags.map((tag, index) => {
                const icon = null;
                return (
                  <Chip
                    key={`${tag}-${index}`}
                    icon={icon}
                    label={tag}
                    onDelete={this.handleDelete(index)}
                    className={classes.chip}
                  />
                );
              })}
            </Paper>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Meta Description
            </label>

            <input
              className="Waftinputbox"
              id="blog-tags"
              type="text"
              value={one.meta_description || ''}
              name="meta-description"
              onChange={this.handleChange('meta_description')}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Meta Tags
            </label>
            <form onSubmit={this.insertMetaTags}>
              <input
                className="Waftinputbox"
                id="blog-meta-tags"
                type="text"
                value={tempMetaTag || ''}
                name="Tags"
                onChange={this.handleTempMetaTag}
              />
            </form>
            <Paper>
              {one.meta_tag.map((tag, index) => {
                const icon = null;

                return (
                  <Chip
                    key={`meta-${tag}-${index}`}
                    icon={icon}
                    label={tag}
                    onDelete={this.handleMetaTagDelete(index)}
                    className={classes.chip}
                  />
                );
              })}
            </Paper>
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Meta Keywords
            </label>


            <form onSubmit={this.insertMetaKeywords}>

              <input
                className="Waftinputbox"
                id="blog-meta-keyword"
                type="text"
                value={tempMetaKeyword || ''}
                name="Tags"
                onChange={this.handleTempMetaKeyword}
              />
            </form>
            <Paper>
              {one.keywords.map((tag, index) => {
                const icon = null;

                return (
                  <Chip
                    key={`metakeywords-${tag}-${index}`}
                    icon={icon}
                    label={tag}
                    onDelete={this.handleMetaKeywordDelete(index)}
                    className={classes.chip}
                  />
                );
              })}
            </Paper>
            {/* <input
              className="Waftinputbox"
              id="blog-meta-keywords"
              type="text"
              value={one.keywords || ''}
              name="keywords"
              onChange={this.handleChange('keywords')}
            /> */}
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2"
              htmlFor="grid-last-name"
            >
              Author
            </label>

            <input
              className="Waftinputbox"
              id="blog-author"
              type="text"
              value={one.author || ''}
              name="Author"
              onChange={this.handleChange('author')}
            />
          </div>

          {/* <InputLabel style={{ color: '#AAAAAA' }}>Activity Type</InputLabel> */}
          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_active || false}
                tabIndex={-1}
                onClick={this.handleCheckedChange('is_active')}
                color="primary"
              />
            }
            label="Is Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={one.is_published || false}
                tabIndex={-1}
                onClick={this.handleCheckedChange('is_published')}
                color="primary"
              />
            }
            label="Is Published"
          />

          <br />
          <button
            className="text-white py-2 px-4 rounded mt-4 btn-waft"
            onClick={this.handleSave}
          >
            Save
          </button>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withStyle = withStyles(styles);
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

  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
