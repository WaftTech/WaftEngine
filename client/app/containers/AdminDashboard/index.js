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
import {
  makeSelectErrors,
  makeSelectUsers,
  makeSelectInfo,
  makeSelectBlog,
} from './selectors';
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
    this.props.loadInfoRequest();
    this.props.loadBlogRequest();
  }

  render() {
    const { users, info, errors, blogs } = this.props;
    return (
      <>
        <PageHeader>Dashboard</PageHeader>
        <PageContent>
          <Paper>
            <Grid item xs={12} sm={12}>
              {info.map(each => (
                <div key={each._id}>
                  <h4>{each.title}</h4>
                  <div dangerouslySetInnerHTML={{ __html: each.detail }} />
                </div>
              ))}
            </Grid>
          </Paper>
          <br />
          <Paper>
            <Grid item xs={12} sm={12}>
              <div>
                {blogs.map(each => (
                  <LinkBoth
                    key={each._id}
                    to={`https://www.waftengine.org/blog/${each._id}`}
                    // to={`localhost:5120/api/blog/${each._id}`}
                    target="_blank"
                  >
                    <div>
                      <h4>{each.title}</h4>
                    </div>
                  </LinkBoth>
                ))}
              </div>
            </Grid>
          </Paper>
          <br />
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div>
                <LinkBoth to="/admin/blog-manage/add/">Write Post</LinkBoth>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <LinkBoth
                  to="https://www.waftengine.org/documentation"
                  target="_blank"
                >
                  Click documentation to get started
                </LinkBoth>
              </div>
            </Grid>
          </Grid>

          <div>
            <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <div>Total users: {users.totaldata}</div>
                  <div>
                    <h3>By Roles: </h3>
                    {users.data.map(each => (
                      <div key={each._id}>
                        {each.roles.role_title}: {each.count}
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div>Total errors: {errors.totaldata}</div>
                  <div>
                    <br />
                    <h3>By Types: </h3>
                    {errors.data.map(each => (
                      <div key={each._id}>
                        {each._id}: {each.count}
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </PageContent>
      </>
    );
  }
}
AdminDashboard.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  loadErrorRequest: PropTypes.func.isRequired,
  loadInfoRequest: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  info: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
  info: makeSelectInfo(),
  blogs: makeSelectBlog(),
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
