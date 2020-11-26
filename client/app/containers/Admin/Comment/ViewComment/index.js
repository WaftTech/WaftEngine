/* eslint-disable no-underscore-dangle */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import * as mapDispatchToProps from '../actions';
import saga from '../saga';
import { makeSelectOne, makeSelectLoading } from '../selectors';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Loading from '../../../../components/Loading';
import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';

export class ViewComment extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadOneRequest(this.props.match.params.id);
  }

  handleCheckedChange = name => event => {
    event.persist();
    const one = { ...this.props.one };
    let newOne = { ...one, [name]: event.target.checked };
    if (name === 'is_approved' && event.target.checked === true) {
      newOne = { ...newOne, is_disapproved: false };
    }
    if (name === 'is_disapproved' && event.target.checked === true) {
      newOne = { ...newOne, is_approved: false };
    }
    this.props.setOneValue(newOne);
  };

  handleBack = () => {
    this.props.push('/admin/blog-comment-manage');
  };

  handleSave = () => {
    this.props.loadManageRequest();
  };

  render() {
    const { classes, one, loading } = this.props;
    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title> Comment Details </title>
        </Helmet>
        <PageHeader>
          <span className="backbtn" onClick={this.handleGoBack}>
            <FaArrowLeft className="text-xl" />
          </span>
          Comment Details
        </PageHeader>
        <PageContent>
          <div className="bg-white mt-2 p-2">
            <div className="print-fluid">
              {one && one.blog_id ? (
                <p className="mb-2">
                  <b> Blog: </b>
                  {one.blog_id.title || ''}
                </p>
              ) : null}
              {one && one.added_by ? (
                <p className="mb-2">
                  <b> Commented By: </b>
                  {one.added_by.name || ''}
                </p>
              ) : null}
              {one && one.status ? (
                <p className="mb-2">
                  <b>Status: </b>
                  {one.status || ''}
                </p>
              ) : null}
              {one && one.added_at ? (
                <p className="mb-2">
                  <b>Added At: </b>
                  {moment(one.added_at).format('ll') || ''}
                </p>
              ) : null}

              <div>
                <b>Is Approved: {''}</b>
                {one && one.is_approved ? <b>Yes</b> : <b>No</b>}
              </div>
              <div>
                <b>Is Disapproved: {''}</b>
                {one && one.is_disapproved ? <b>Yes</b> : <b>No</b>}
              </div>
            </div>
          </div>
        </PageContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'blogCommentManagePage', reducer });
const withSaga = injectSaga({ key: 'blogCommentManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewComment);
