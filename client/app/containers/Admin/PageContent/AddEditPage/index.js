import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectMetaTag,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import { DATE_FORMAT } from '../../../App/constants';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import { makeSelectToken } from '../../../App/selectors';
import WECkEditior from '../../../../components/CkEditor';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import Dialog from '../../../../components/Dialog/index';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    // classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = { openMedia: false };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
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

  handleDateChange = name => date => {
    this.props.setOneValue({
      key: name,
      value: moment(date).format(DATE_FORMAT),
    });
  };

  handleGoBack = () => {
    this.props.push('/admin/page-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleTempMetaTag = e => {
    e.persist();
    this.props.setMetaTagValue(e.target.value);
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

  handleMetaTagDelete = index => () => {
    const chipData = [...this.props.one.meta_tag];

    chipData.splice(index, 1);
    this.props.setOneValue({ key: 'meta_tag', value: chipData });
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

  render() {
    const { one, classes, match, loading, errors, tempMetaTag } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <>
        <Helmet>
          <title>
            {' '}
            {match && match.params && match.params.id
              ? 'Edit Static Page'
              : 'Add Static Page'}
          </title>
        </Helmet>
        <Dialog
          open={this.state.openMedia}
          className="w-5/6 h-full overflow-auto"
          onClose={this.handleClose}
          title={`Select Images`}
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
        <div>
          <div className="flex justify-between my-3">
            <PageHeader>
              <span className="backbtn" onClick={this.handleGoBack}>
                <FaArrowLeft className="text-xl" />
              </span>
              {match && match.params && match.params.id
                ? 'Edit Static Page'
                : 'Add Static Page'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <label>Title</label>
              <input
                className="inputbox"
                id="page_title"
                type="text"
                value={one.name}
                onChange={this.handleChange('name')}
              />
              {errors && errors.name && errors.name.trim() !== '' && (
                <div className="error">{errors.name}</div>
              )}
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label>Page Key</label>
              <input
                className="inputbox"
                id="page_key"
                type="text"
                value={one.key}
                onChange={this.handleChange('key')}
              />
              {errors && errors.key && errors.key.trim() !== '' && (
                <div className="error">{errors.key}</div>
              )}
            </div>
            <div className="pb-4">
              <WECkEditior
                description={one.description}
                setOneValue={this.props.setOneValue}
              />
              {errors &&
                errors.description &&
                errors.description.trim() !== '' && (
                  <div className="error">{errors.description}</div>
                )}
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label>Meta Title</label>
              <input
                className="inputbox"
                id="page_meta_title"
                type="text"
                value={one.meta_title}
                onChange={this.handleChange('meta_title')}
              />
              {errors &&
                errors.meta_title &&
                errors.meta_title.trim() !== '' && (
                  <div className="error">{errors.meta_title}</div>
                )}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label>Meta Description</label>
              <input
                className="inputbox"
                id="page_meta_description"
                type="text"
                value={one.meta_description}
                onChange={this.handleChange('meta_description')}
              />
              {errors &&
                errors.meta_description &&
                errors.meta_description.trim() !== '' && (
                  <div className="error">{errors.meta_description}</div>
                )}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="label" htmlFor="page_meta_tags">
                Meta Tags
              </label>
              <form onSubmit={this.insertMetaTags}>
                <input
                  className="inputbox"
                  id="page_meta_tags"
                  type="text"
                  value={tempMetaTag || ''}
                  name="Tags"
                  onChange={this.handleTempMetaTag}
                />
              </form>
              {one.meta_tag &&
                one.meta_tag.map((tag, index) => {
                  const icon = null;

                  return (
                    <label
                      onClick={this.handleMetaTagDelete(index)}
                      className="tag"
                      key={`meta-${tag}-${index}`}
                    >
                      {tag}
                      <span>
                        <FaTimes />
                      </span>
                    </label>
                  );
                })}
            </div>

            <div className="flex w-full justify-between md:w-1/2 px-2">
              <div className="w-full md:w-1/2 -ml-2">
                <label className="label" htmlFor="publish_from">
                  Published From
                </label>
                <DatePicker
                  margin="normal"
                  name="publish_from"
                  className="inputbox"
                  value={
                    (one.publish_from &&
                      moment(one.publish_from).format(DATE_FORMAT)) ||
                    ''
                  }
                  onChange={this.handleDateChange('publish_from')}
                />
              </div>
              <div className="w-full md:w-1/2 -mr-2">
                <label className="label" htmlFor="publish_to">
                  Published To
                </label>
                <DatePicker
                  margin="normal"
                  name="publish_to"
                  className="inputbox"
                  value={
                    (one.publish_to &&
                      moment(one.publish_to).format(DATE_FORMAT)) ||
                    ''
                  }
                  onChange={this.handleDateChange('publish_to')}
                />
              </div>
            </div>
            <div className="w-1/2 pb-4 -mr-2 mt-4">
              <section
                onClick={this.handleSetImage}
                className="text-black hover:border-primary hover:text-primary text-center self-start py-3 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"
              >
                <button
                  type="button"
                  className="text-black py-2 px-4 rounded font-bold bg-waftprimary hover:text-primary"
                >
                  Featured Image
                </button>
              </section>
              {errors && errors.image && (
                <div className="error">{errors.image}</div>
              )}
            </div>
            {one && one.image && one.image.path && (
              <div>
                <img src={`${IMAGE_BASE}${one.image.path}`} />
              </div>
            )}

            <div className="checkbox">
              <input
                checked={one.is_active || false}
                onClick={this.handleCheckedChange('is_active')}
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

            <button
              className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
              onClick={this.handleSave}
            >
              Save
            </button>
          </PageContent>
        </div>
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'PagecontentListing', reducer });
const withSaga = injectSaga({ key: 'PagecontentListing', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
  tempMetaTag: makeSelectMetaTag(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withRouter, withReducer, withSaga, withConnect)(AddEdit);
