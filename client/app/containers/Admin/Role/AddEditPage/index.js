import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
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
import Loading from '../../../../components/Loading';
import '../../../../components/Table/table.css';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';

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

  handleChecked = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleBack = () => {
    this.props.push('/admin/role-manage');
  };

  render() {
    const { classes, one, match, loading, errors } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? 'Edit Role'
              : 'Add Role'}
          </title>
        </Helmet>
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {match && match.params && match.params.id
              ? 'Edit Role'
              : 'Add Role'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <label>Role Title</label>
            <input
              className="inputbox"
              id="role_title"
              type="text"
              value={one.role_title}
              onChange={this.handleChange('role_title')}
              error={errors.role_title}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm">Description</label>
            <textarea
              className="inputbox"
              id="description"
              type="text"
              value={one.description}
              onChange={this.handleChange('description')}
              required
            />
            <div id="component-error-text">{errors.description}</div>
          </div>

          <div className="checkbox">
            <input
              checked={one.is_active}
              onChange={this.handleChecked('is_active')}
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
            Save
          </button>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'adminRole', reducer });
const withSaga = injectSaga({ key: 'adminRole', saga });

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
