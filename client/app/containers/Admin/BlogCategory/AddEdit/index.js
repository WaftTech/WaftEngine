import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Dropzone from 'react-dropzone';
import CKEditor from 'react-ckeditor-component';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components

import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import Loading from '../../../../components/Loading';
import { IMAGE_BASE } from '../../../App/constants';
import defaultImage from '../../../../assets/img/logo.svg';

const styles = theme => ({
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
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = {
    tempImage: defaultImage,
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.slug) {
      this.props.loadOneRequest(this.props.match.params.slug);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const { one } = nextProps;
      if (one && one.image && one.image.fieldname) {
        const tempImage =
          one && one.image && one.image.path && `${IMAGE_BASE}${one.image.path}`;
        this.setState({ ...one, tempImage });
      }
    }
  }

  slugify = text => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const slug = this.slugify(event.target.value);
      this.props.setOneValue({ key: 'slug_url', value: slug });
    }
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setOneValue({ key: name, value: newContent });
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

  handleGoBack = () => {
    this.props.push('/admin/blog-cat-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, match, loading, errors } = this.props;
    const { tempImage } = this.state;
    return loading && loading == true ? (
      <Loading />
    ) : (
        <div>
          <Helmet>
            <title>
              {match && match.params && match.params.slug
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
              {match && match.params && match.params.slug
                ? 'Edit Blog Category'
                : 'Add Blog Category'}
            </PageHeader>
          </div>

          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                htmlFor="grid-blog-title"
              >
                Blog Title
            </label>
              <input
                className="inputbox"
                id="title"
                type="text"
                value={one && one.title || ''}
                name="Title"
                onChange={this.handleChange('title')}
              />
              <div id="component-error-text">{errors && errors.title}</div>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                htmlFor="grid-slug"
              >
                Slug
            </label>
              <input
                className="inputbox"
                id="slug"
                type="text"
                value={one && one.slug_url || ''}
                name="slug"
                onChange={this.handleChange('slug_url')}
              />
              <div id="component-error-text">{errors && errors.slug_url}</div>
            </div>
            <div className="pb-4">
              <label className="block uppercase tracking-wide text-gray-800 text-xs mb-2">
                Blog Category Description
            </label>
              <CKEditor
                name="cat-description"
                content={one && one.description}
                config={{ allowedContent: true }}
                events={{
                  change: e => this.handleEditorChange(e, 'description'),
                  value: one && one.description || '',
                }}
              />
            </div>
            <div className="w-full md:w-1/2 pb-4 mt-4">
              <label
                className="block uppercase tracking-wide text-gray-800 text-xs mb-2"
                htmlFor="Image"
              >
                Image
            </label>
              <Dropzone onDrop={files => this.onDrop(files, 'image')}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      className="inputbox cursor-pointer"
                      src={tempImage}
                      alt="BlogCategoryImage"
                      style={{ height: '120px', width: '60%' }}
                    />
                  </div>
                )}
              </Dropzone>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={one && one.is_active || false}
                    tabIndex={-1}
                    onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Is Active"
              />
            </div>

            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={this.handleSave}
            >
              Save
          </button>
          </PageContent>
        </div>
      );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({
  key: 'BlogCategory',
  reducer,
});
const withSaga = injectSaga({ key: 'BlogCategory', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
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
