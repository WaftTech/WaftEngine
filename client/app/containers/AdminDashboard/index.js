/**
 *
 * AdminDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectErrors, makeSelectUsers } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import LinkBoth from '../../components/LinkBoth';

/* eslint-disable react/prefer-stateless-function */
export class AdminDashboard extends React.PureComponent {
  componentDidMount() {
    this.props.loadUserRequest();
    this.props.loadErrorRequest();
  }

  render() {
    const { users, errors } = this.props;
    return (
      <>
        <div>
          <PageHeader>Dashboard</PageHeader>
          <PageContent>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div>
                  <LinkBoth to="/admin/blog-manage/add/">Write Post</LinkBoth>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>
                  <LinkBoth to="https://www.waftengine.org/documentation">
                    Click documentation to get started
                  </LinkBoth>
                </div>
              </Grid>
            </Grid>
            <br />
            <div>
              <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <div>Total users:{users}</div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div>Total errors: {errors}</div>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </PageContent>
        </div>
      </>
    );
  }
}
AdminDashboard.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  loadErrorRequest: PropTypes.func.isRequired,
  users: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminDashboard', reducer });
const withSaga = injectSaga({ key: 'adminDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminDashboard);
