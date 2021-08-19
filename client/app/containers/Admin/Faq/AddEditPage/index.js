import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectCategory,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import { FaArrowLeft } from 'react-icons/fa';
import CKEditor from 'react-ckeditor-component';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),

    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    category: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.props.setOneValue({ key: name, value: newContent });
  };

  handleGoBack = () => {
    this.props.push('/admin/faq-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, category, one, match, loading, errors } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <>
        <Helmet>
          <title>
            {match && match.params && match.params.id ? 'Edit Faq' : 'Add Faq '}
          </title>
        </Helmet>
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleGoBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {match && match.params && match.params.id ? 'Edit Faq' : 'Add Faq'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label>Question</label>
            <input
              className="inputbox"
              id="faq"
              type="text"
              name="Question"
              value={one.question || ''}
              onChange={this.handleChange('question')}
            />
          </div>
          <div className="w-full md:w-1/2 pb-4">
            <label>Answer</label>
            {/* <textarea
                className="inputbox"
                multiline="true"
                rows="5"
                name="Answer"
                id="faq-answer"
                value={one.title || ''}
                onChange={this.handleChange('title')}
              /> */}

            <CKEditor
              name="Answer"
              content={one && one.title}
              config={{ allowedContent: true }}
              events={{
                change: e => this.handleEditorChange(e, 'title'),
                value: (one && one.title) || '',
              }}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <label>Category</label>
            <select
              className="inputbox"
              value={one.category || ''}
              onChange={this.handleChange('category')}
              inputprops={{
                name: 'category',
                id: 'category-title',
              }}
            >
              <option value="" disabled>
                None
              </option>
              {category &&
                category.length &&
                category.map(each => (
                  <option key={each._id} value={each._id}>
                    {each.title}
                  </option>
                ))}
            </select>
          </div>

          <button
            className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            onClick={this.handleSave}
          >
            Save
          </button>
        </PageContent>
      </>
    );
  }
}

const withReducer = injectReducer({ key: 'faqManagePage', reducer });
const withSaga = injectSaga({ key: 'faqManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });
export default compose(withReducer, withSaga, withConnect)(AddEdit);
