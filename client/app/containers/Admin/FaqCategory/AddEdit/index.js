import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors, makeSelectLoading, makeSelectOne
} from '../selectors';



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

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleGoBack = () => {
    this.props.push('/admin/faq-cat-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {
    const { classes, one, match, loading, errors } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
        <div>
          <Helmet>
            <title>
              {match && match.params && match.params.id
                ? 'Edit Faq Category'
                : 'Add Faq Category'}
            </title>
          </Helmet>
          <div className="flex justify-between my-3">
            <PageHeader>
              <span className="backbtn" onClick={this.handleGoBack}>
                <FaArrowLeft className="text-xl" />
              </span>
              {match && match.params && match.params.id
                ? 'Edit Faq Category'
                : 'Add Faq Category'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <label>Title</label>
              <input
                className="inputbox"
                id="title"
                name="Title"
                type="text"
                value={one.title}
                onChange={this.handleChange('title')}
              />
                {errors && errors.title && errors.title.trim() !== '' && (
              <div className="error">{errors && errors.title}</div>
                )}
            </div>
            <div className="w-full md:w-1/2 pb-4">
              <label>Key</label>
              <input
                className="inputbox"
                id="key"
                name="key"
                type="text"
                value={one.key}
                onChange={this.handleChange('key')}
              />
                {errors && errors.key && errors.key.trim() !== '' && (
              <div className="error">{errors && errors.key}</div>
                )}
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
              className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
              onClick={this.handleSave}
            >
              Save
          </button>
          </PageContent>
        </div>
      );
  }
}

const withReducer = injectReducer({
  key: 'adminFaqCategoryManagePage',
  reducer,
});
const withSaga = injectSaga({ key: 'adminFaqCategoryManagePage', saga });

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
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
