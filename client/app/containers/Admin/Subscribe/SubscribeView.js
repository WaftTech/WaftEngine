/* eslint-disable no-underscore-dangle */
import { push } from 'connected-react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading, makeSelectOne } from './selectors';

export class ViewSubscriber extends React.Component {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    one: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleBack = () => {
    this.props.push('/admin/subscribe-manage');
  };

  render() {
    const { classes, one, loading } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title> Subscriber Details </title>
        </Helmet>
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            Subscribe Details
          </PageHeader>
        </div>
        <PageContent>
          <div className="bg-white mt-2 p-2">
            <div className="mb-2 Capitalize">
              <b>Email: </b>
              {one && one.email ? one.email : ''}
            </div>

            <div className="mb-2 Capitalize">
              <b>Is Subscribed: </b>
              {one && one.is_subscribed ? '' + one.is_subscribed : ''}
            </div>

            <div className="mb-2 Capitalize">
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

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'adminSubscribePage', reducer });
const withSaga = injectSaga({ key: 'adminSubscribePage', saga });

export default compose(withReducer, withSaga, withConnect)(ViewSubscriber);
