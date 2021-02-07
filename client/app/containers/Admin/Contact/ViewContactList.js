/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import * as mapDispatchToProps from './actions';
import saga from './saga';
import { makeSelectOne, makeSelectLoading } from './selectors';
import { DATE_FORMAT } from '../../App/constants';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Loading from '../../../components/Loading';
import { FaArrowLeft } from 'react-icons/fa';

export class ViewContacts extends React.Component {
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
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleBack = () => {
    this.props.push('/admin/contact-manage');
  };

  render() {
    const { classes, one, loading } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title> Contact Details </title>
        </Helmet>
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            Contact Details
          </PageHeader>
        </div>
        <PageContent>
          <div className="bg-white mt-2 p-2">
            <div className="mb-2 capitalize">
              <b>Name: </b>
              {one && one.name ? one.name : ''}
            </div>

            <div className="mb-2 capitalize">
              <b>Email: </b>
              {one && one.email ? one.email : ''}
            </div>

            <div className="mb-2 capitalize">
              <b>Message: </b>
              {one && one.message ? one.message : ''}
            </div>

            <div className="mb-2 capitalize">
              <b>Subject: </b>
              {one && one.subject ? one.subject : ''}
            </div>

            <div className="mb-2">
              <b>Added At: </b>
              {moment(one && one.added_at).format(DATE_FORMAT)}
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

const withReducer = injectReducer({ key: 'adminContactListPage', reducer });
const withSaga = injectSaga({ key: 'adminContactListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewContacts);
