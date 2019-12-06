/* eslint-disable no-underscore-dangle */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Button } from '@material-ui/core';
import reducer from '../reducer';
import * as mapDispatchToProps from '../actions';
import saga from '../saga';
import { makeSelectOne, makeSelectLoading } from '../selectors';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import Loading from '../../../../components/Loading';
import moment from 'moment';

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
          <IconButton
            className={`${classes.backbtn} cursor-pointer`}
            onClick={this.handleBack}
            aria-label="Back"
          >
            <BackIcon />
          </IconButton>
          Comment Details
        </PageHeader>
        <PageContent>
          <div className="print-fluid" style={{ width: 870 }}>
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
            {/* <div>
              <FormControlLabel
                className="ml-2"
                control={
                  <Checkbox
                    color="primary"
                    checked={(one && one.is_approved) || false}
                    onClick={this.handleCheckedChange('is_approved')}
                  />
                }
                label="Is Approved"
              />
              <FormControlLabel
                className="ml-2"
                control={
                  <Checkbox
                    color="primary"
                    checked={(one && one.is_disapproved) || false}
                    onClick={this.handleCheckedChange('is_disapproved')}
                  />
                }
                label="Is Disapproved"
              />
            </div>

            <button
              className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={this.handleSave}
            >
              Save
              </button> */}
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

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(ViewComment);
