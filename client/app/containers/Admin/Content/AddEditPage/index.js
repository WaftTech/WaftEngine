import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import WECkEditior from '../../../../components/CkEditor';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { makeSelectToken } from '../../../App/selectors';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors, makeSelectLoading,

  makeSelectMetaTag, makeSelectOne
} from '../selectors';

import * as mapDispatchToProps from '../actions';
import { DATE_FORMAT } from '../../../App/constants';
import { FaCheck, FaArrowLeft, FaTimes } from 'react-icons/fa';

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

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id !== '') {
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
    this.props.push('/admin/content-manage');
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

  render() {
    const {
      one,
      classes,
      match,
      loading,
      errors,
      tempMetaTag,
      edit_id,
    } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
        <>
          <Helmet>
            <title>
              {' '}
              {edit_id && edit_id !== ''
                ? 'Edit Section Content'
                : 'Add Section Content'}
            </title>
          </Helmet>
          <div className="flex justify-between my-3">
            <PageHeader>
              <span className="backbtn" onClick={this.handleGoBack}>
                <FaArrowLeft className="text-xl" />
              </span>
              {match && match.params && match.params.id
                ? 'Edit Static Content'
                : 'Add Static Content'}
            </PageHeader>
          </div>

          <PageContent className="bg-white border- p-4">
            <div className="w-full md:w-1/2 pb-4">
              <label>Content Title</label>
              <input
                className="inputbox"
                id="grid-last-name"
                type="text"
                value={one.name}
                onChange={this.handleChange('name')}
              />
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

            <div className="w-full md:w-1/2 pb-4">
              <label>Content Key</label>
              <input
                className="inputbox"
                id="grid-last-name"
                type="text"
                value={one.key}
                onChange={this.handleChange('key')}
              />{' '}
              <div className="error">{errors && errors.key}</div>
            </div>

            <div>
              <WECkEditior
                description={one.description}
                setOneValue={this.props.setOneValue}
              />
              <div className="error">{errors.description}</div>
            </div>

            <div className="w-full md:w-1/2 pb-4">
              <label>Meta Title</label>
              <input
                className="inputbox"
                id="grid-last-meta_title"
                type="text"
                value={one.meta_title}
                onChange={this.handleChange('meta_title')}
              />
              <div className="error">{errors && errors.meta_title}</div>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label>Meta Description</label>
              <input
                className="inputbox"
                id="grid-last-meta_description"
                type="text"
                value={one.meta_description}
                onChange={this.handleChange('meta_description')}
              />
              <div className="error">{errors && errors.meta_description}</div>
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label className="text-sm" htmlFor="grid-last-name">
                Meta Tags
            </label>
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
              {one.meta_tag &&
                one.meta_tag.map((tag, index) => {
                  const icon = null;

                  return (
                    <label
                      onDelete={this.handleMetaTagDelete(index)}
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
                <label className="text-sm" htmlFor="grid-last-name">
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
                <label className="text-sm" htmlFor="grid-last-name">
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
              className="block btn bg-blue-500 border border-blue-600 hover:bg-blue-600"
              onClick={this.handleSave}
            >
              Save Content
          </button>
          </PageContent>
        </>
      );
  }
}

const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
  tempMetaTag: makeSelectMetaTag(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
