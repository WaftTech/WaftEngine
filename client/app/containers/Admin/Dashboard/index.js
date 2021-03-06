/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';

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
import PageHeader from '../../../components/PageHeader/PageHeader';
import LinkBoth from '../../../components/LinkBoth';

import {
  FaStickyNote,
  FaExclamationCircle,
  FaUser,
  FaNewspaper,
} from 'react-icons/fa';

const styles = theme => ({
  dashicon: {
    fontSize: '50px',
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    color: '#666',
    '&:hover': {
      color: '#000000',
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.loadUserRequest();
    this.props.loadErrorRequest();
    this.props.loadInfoRequest();
    this.props.loadBlogRequest();
  }

  render() {
    const { classes, users, info, errors, blogs } = this.props;
    return (
      <>
        <div className="flex justify-between my-3">
          <PageHeader>Dashboard</PageHeader>
        </div>
        <div className="bg-white rounded p-4">
          {info.map(each => (
            <div key={each._id}>
              <h3 className="border-b text-2xl font-bold border-gray-300 pb-2">
                {each.title}
              </h3>
              <div
                className="mt-2 flex flex-wrap justify-between p-4 rounded"
                dangerouslySetInnerHTML={{ __html: each.detail }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mx-8 my-4">
          <div className="w-1/4 -ml-8 bg-white rounded p-5 text-center hover:text-black">
            <LinkBoth
              to="/admin/blog-manage/add/"
              className="text-gray-800 no-underline hover:text-black font-bold"
            >
              <FaStickyNote className="text-5xl mx-auto" />
              Write Post
            </LinkBoth>
          </div>
          <div className="w-1/4 -ml-4 bg-white rounded p-5 text-center hover:text-black">
            <LinkBoth
              className="text-gray-800 no-underline hover:text-black font-bold"
              to="https://waftengine.org/documentation"
              target="_blank"
            >
              <FaNewspaper className="text-5xl mx-auto" />
              View Doc
            </LinkBoth>
          </div>
          <div className="w-1/4 -ml-4 -mr-4 bg-white rounded p-5 flex justify-between hover:text-black">
            <span className="text-gray-800 m-auto w-24 text-center font-bold">
              <FaUser className="text-5xl mx-auto" />
              Total Users{' '}
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold ml-4 w-12 h-12 text-center rounded-full bg-waftprimary-light leading-loose">
              {users.totaldata}
            </span>
          </div>
          <div className="w-1/4 -mr-8 bg-white rounded p-5 flex justify-between hover:text-black">
            <span className="text-gray-800 m-auto w-24 text-center font-bold">
              <FaExclamationCircle className={classes.dashicon} />
              Total Errors
            </span>
            <span className="m-auto inline-block text-black text-2xl font-bold ml-4 w-12 h-12 text-center rounded-full bg-waftprimary-light leading-loose">
              {errors.totaldata}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mx-4 my-4">
            <div className="w-1/2 -ml-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                By Roles{' '}
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {users &&
                  users.data &&
                  users.data.role &&
                  users.data.role.map(each => (
                    <div
                      key={each._id}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between px-2 h-10 items-center">
                        <span>{each.role_title}: </span>
                        <span className="inline-block text-waftprimary text-2xl text-right font-bold">
                          {users.data &&
                            users.data.user &&
                            users.data.user.filter(e =>
                              e.roles.includes(each._id),
                            ).length}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-1/2 -mr-4 bg-white rounded pb-4">
              <h3 className="p-4 font-bold text-2xl border-b border-gray-300">
                By Types{' '}
              </h3>
              <div className="flex flex-wrap justify-between mx-4">
                {errors.data && errors.data.length ? (
                  errors.data.map(each => (
                    <div
                      key={each._id}
                      className="w-1/2 p-2 bg-gray-200 my-2 -ml-2 -mr-2 rounded"
                    >
                      <div className="flex justify-between h-10 items-center px-2">
                        <span className="w-24 text-sm">{each._id}</span>
                        <span className="inline-block text-waftprimary font-bold text-2xl text-right ">
                          {each.count}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between">
                    <h2 className="w-full m-auto h-full text-xl font-bold text-red-500">
                      No Errors
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
Dashboard.propTypes = {
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
const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
